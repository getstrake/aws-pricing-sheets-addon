function EC2_EBS_GB(a, b, c, d) {
  if(typeof a === "string") 
    return fetchApiEBS({
      volumeType: a, 
      volumeSize: b, 
      region: c, 
      storageType: "storage"
    }
  )
  else {
    [ settings, 
      volumeType,
      volumeSize, 
      region
    ] = [a, b, c, d]
    return EC2_EBS_GB_FROM_SETTINGS(volumeType, settings, volumeSize, region);
  }
}

// settings are retrieved from a range, a 2d array
function EC2_EBS_GB_FROM_SETTINGS(volumeType, settings, volumeSize, region) {
  
  settings = mapValuesToObjectWithLowerCaseValues(settings);
  if (!settings.region && !region)
    throw "Missing region or region not specified in settings.";
  
  const options = {
    volumeType, 
    volumeSize, 
    region: settings.region || region, 
    storageType: "storage"
  };

  return fetchApiEBS(options);
}

function EC2_EBS_SNAPSHOT_GB(a, b, c) {
  return EC2_EBS(null, "snapshot", a, b, c);
}

function EC2_EBS_IO1_IOPS(a, b, c) {
  return EC2_EBS('io1', 'iops', a, b, c);
}

function EC2_EBS_IO2_IOPS(a, b, c) {
  return EC2_EBS('io2', 'iops', a, b, c);
}

function EC2_EBS_GP3_IOPS(a, b, c) {
  return EC2_EBS('gp3', 'iops', a, b, c);
}

function EC2_EBS(volumeType, storageType, a, b, c) {
  if(typeof a === "string" || typeof a === "number") {
    const [volumeSize, region] = [a, b];
    return fetchApiEBS({ volumeType, volumeSize, storageType, region });
  }

  // else
  let [settings, volumeSize, region] = [a, b, c];

  settings = mapValuesToObjectWithLowerCaseValues(settings);
  if (!settings.region && !region)
    throw "Missing region or region not specified in settings.";

  return fetchApiEBS({
    volumeType,
    volumeSize, 
    region: settings.region || region, 
    storageType
  });
}

function fetchApiEBS(options) {
  options = getObjectWithLowerCaseValues(options);
  const { volumeSize, region } = options;
  const path = `/pricing/1.0/ec2/region/${region}/ebs/index.json`;
  const url = `${cfg.baseHost}${path}`;
  const response = JSON.parse(fetchUrlCached(url));
  if(cfg.testing) {
    console.log({url, response});
    saveToDrive(response, "ebs.json");
  }
  const price = getPriceEBS(response.prices, options);
  return price / cfg.hoursPerMonth;
}

const getPriceEBS = (prices, options) => {
  const { volumeType, storageType, volumeSize } = options;

  console.log({storageType, volumeType})

  if (storageType === "iops") {
    if(volumeType === "io2")
      return tieredIO2IOPS(prices, volumeSize)
    if(volumeType === "gp3")
      return tieredGP3IOPS(prices, volumeSize)
  }

  const volumeTypeMap = {
    'magnetic': 'Magnetic',
    'gp2': 'General Purpose',
    'gp3': 'General Purpose',
    'st1': 'Throughput Optimized HDD',
    'sc1': 'Cold HDD',
    'io1': 'Provisioned IOPS',
    'io2': 'Provisioned IOPS',
  }

  function usageTypeFull(volumeType) {
    switch (volumeType) {
      case 'magnetic':
        return 'EBS:VolumeUsage'
      case 'io1':
        return 'EBS:VolumeUsage.piops'
      default:
        return 'EBS:VolumeUsage.' + volumeType
    }
  }

  const filterStorageLib = {
    storage: p =>
      p.attributes['aws:ec2:volumeType'] === volumeTypeMap[volumeType] &&
      p.attributes['aws:ec2:usagetype'].endsWith(usageTypeFull(volumeType)), // The usagetype is prefixed with a region abbrev. outside of UE1
    snapshot: p =>
      p.attributes['aws:ec2:usagetype'].endsWith("EBS:SnapshotUsage"),
    iops: p =>
      p.attributes['aws:ec2:usagetype'].endsWith('EBS:VolumeP-IOPS.piops') //EBS:VolumeUsage.piops')
  }

  console.log('filting on volumeTypeMap[volumeType] ' + volumeTypeMap[volumeType]);
  console.log('filting on usageTypeFull(volumeType) ' + usageTypeFull(volumeType));

  prices = prices.filter(filterStorageLib[storageType] || filterStorageLib.snapshot); // from v1: take snapshot if no storageType matches

  if (prices.length === 0)
    throw "Can not find instance";
  if (prices.length > 1)
    throw "Multiple prices found";

  return parseFloat(prices[0].price.USD) * parseFloat(volumeSize)
}

function tieredIO2IOPS(prices, volumeSize) {
  let price1 = filterPricesVolumeIopsIO2(prices, 'tier1')
  let price2 = filterPricesVolumeIopsIO2(prices, 'tier2')
  let price3 = filterPricesVolumeIopsIO2(prices, 'tier3')

  if (price1.length !== 1 || price2.length !== 1 || price3.length !== 1) {
    throw `Unable to find tiered pricing for IO2 IOPS`
  }

  let tiers = [0.0, 32000.0, 64000.0]
  let priceTiers = [price1[0], price2[0], price3[0]]

  console.log({tiers, priceTiers: JSON.stringify(priceTiers), volumeSize})

  return totalPriceEBS(tiers, priceTiers, volumeSize);
}

function filterPricesVolumeIopsIO2(prices, tier) {
  let usageType = 'EBS:VolumeP-IOPS.io2';
  if (tier === 'tier2') {
    usageType = 'EBS:VolumeP-IOPS.io2.tier2';
  } else if (tier === 'tier3') {
    usageType = 'EBS:VolumeP-IOPS.io2.tier3';
  }

  return prices.filter(price => {
    return price.attributes['aws:ec2:usagetype'] === usageType;
  })
}

function tieredGP3IOPS(prices, volumeSize) {
  let priceTier = prices.filter(price => {
    return price.attributes['aws:ec2:usagetype'] === 'EBS:VolumeUsage.gp3';
  })

  if (priceTier.length !== 1) {
    throw `Unable to find pricing for GP3 IOPS`
  }

  let tiers = [0.0, 3000.0];

  // We fake the first tier since it is free
  let priceTiers = [{ price: { USD: 0.0 } }, priceTier[0]]

  return totalPriceEBS(tiers, priceTiers, volumeSize);
}


function totalPriceEBS(tiers, priceTiers, volumeSize) {
  console.log({volumeSize, tiers, priceTiers});
  volumeSize = parseFloat(volumeSize);
  let total = 0;
  for (var i = tiers.length - 1; i >= 0; i--) {
    if (volumeSize > tiers[i]) {
      total += priceTiers[i].price.USD * (volumeSize - tiers[i])
      volumeSize -= (volumeSize - tiers[i])
    }
  }
  return total;
}