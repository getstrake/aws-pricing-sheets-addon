function EC2_EBS_GB(settingsOrVolumeType, volumeTypeOrVolumeSize, volumeSizeOrRegion, region) {
  if(typeof settingsOrVolumeType === "string") {
    return fetchApiEBS({
      volumeType: settingsOrVolumeType, 
      volumeSize: volumeTypeOrVolumeSize, 
      region: volumeSizeOrRegion, 
      storageType: "storage"
    }
  )
  } else { // first argument is a range selected from the sheet with settings
    [ settings, 
      volumeType,
      volumeSize
    ] = [settingsOrVolumeType, volumeTypeOrVolumeSize, volumeSizeOrRegion]
    return EC2_EBS_FROM_SETTINGS({settings, volumeType, storageType: "storage", volumeSize, region})
  }
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
    return fetchApiEBS({ volumeType, storageType, volumeSize, region });
  }

  // else
  let [settings, volumeSize, region] = [a, b, c];
  return EC2_EBS_FROM_SETTINGS({settings, volumeType, storageType, volumeSize, region})
}

function EC2_EBS_FROM_SETTINGS({settings, volumeType, storageType, volumeSize, region}) {
  if ((!storageType || storageType.toString().toLowerCase() !== "snapshot") && !getVolumeTypeFullName(volumeType)) {
    throw `invalid EBS volume type`
  }
  
  settings = mapValuesToObjectWithLowerCaseValues(settings);

  return fetchApiEBS({
    volumeType,
    volumeSize, 
    region: region || settings.region, 
    storageType
  });
}

function fetchApiEBS(options) {
  options = getObjectWithLowerCaseValues(options);
  const { region, volumeSize } = options;

  if (!region)
    throw "must specify region";
  if (!parseFloat(volumeSize))
    throw "unable to parse volume units";

  const path = `/pricing/1.0/ec2/region/${region}/ebs/index.json`;
  const url = `${cfg.baseHost}${path}`;
  const response = JSON.parse(fetchUrlCached(url));
  if(cfg.testing) {
    console.log({url, response});
    saveToDrive(response, "ebs.json");
  }
  const totalPrice = getTotalPriceEBS(response.prices, options);
  const pricePerHour = totalPrice / cfg.hoursPerMonth;
  return pricePerHour;
}

function getVolumeTypeFullName(volumeType) {
  const volumeTypeMap = {
    'magnetic': 'Magnetic',
    'gp2': 'General Purpose',
    'gp3': 'General Purpose',
    'st1': 'Throughput Optimized HDD',
    'sc1': 'Cold HDD',
    'io1': 'Provisioned IOPS',
    'io2': 'Provisioned IOPS',
  }
  return volumeTypeMap[volumeType?.toString().toLowerCase()]
}

const getTotalPriceEBS = (prices, options) => {
  const { volumeType, storageType, volumeSize } = options;

  console.log({storageType, volumeType})

  if (storageType === "iops") {
    if(volumeType === "io2")
      return tieredIO2IOPS(prices, volumeSize)
    if(volumeType === "gp3")
      return tieredGP3IOPS(prices, volumeSize)
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
      p.attributes['aws:ec2:volumeType'] === getVolumeTypeFullName(volumeType) &&
      p.attributes['aws:ec2:usagetype'].endsWith(usageTypeFull(volumeType)), // The usagetype is prefixed with a region abbrev. outside of UE1
    snapshot: p =>
      p.attributes['aws:ec2:usagetype'].endsWith("EBS:SnapshotUsage"),
    iops: p =>
      p.attributes['aws:ec2:usagetype'].endsWith('EBS:VolumeP-IOPS.piops') //EBS:VolumeUsage.piops')
  }

  console.log('filting on volumeTypeMap[volumeType] ' + getVolumeTypeFullName(volumeType));
  console.log('filting on usageTypeFull(volumeType) ' + usageTypeFull(volumeType));

  prices = prices.filter(filterStorageLib[storageType] || filterStorageLib.snapshot); // from v1: take snapshot if no storageType matches

  if (prices.length === 0)
    throw "Can not find instance";
  if (prices.length > 1)
    throw "Multiple prices found";

  return parseFloat(prices[0].price.USD) * parseFloat(volumeSize);
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
    return price.attributes['aws:ec2:usagetype'].endsWith('EBS:VolumeP-IOPS.gp3');
  })

  if (priceTier.length !== 1) {
    throw `Unable to find pricing for GP3 IOPS`
  }

  let tiers = [0.0, 3000.0];


  // We fake the first tier since it is free
  let priceTiers = [{ price: { USD: 0.0 } }, priceTier[0]]
  console.log({tiers, priceTiers: JSON.stringify(priceTiers.map(x => x.price)), volumeSize})

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