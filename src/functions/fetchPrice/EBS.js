function fetchApiEBS(options, funcName) {
  options = getObjectWithLowerCaseValues(options);
  const { region, volumeSize } = options;

  if (!region)
    throw "must specify region";
  if (!parseFloat(volumeSize))
    throw "unable to parse volume units";

  const path = `/ec2/region/${region}/ebs/index.json`;
  const url = `${cfg.baseHost}${path}`;
  let response;
  try {
    response = JSON.parse(fetchUrlCached(url, funcName));
  } catch(err) {
    throw 'Unable to find the price. Make sure you have the correct region.'
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
  const volumeTypeFullName = volumeTypeMap[volumeType?.toString().toLowerCase()];
  if(!volumeTypeFullName) throw "Unknown volume type " + volumeType;
  return volumeTypeFullName;
}

const getTotalPriceEBS = (prices, options) => {
  const { volumeType, storageType, volumeSize } = options;

  // console.log({storageType, volumeType})

  if (storageType === "iops") {
    if(volumeType === "io2")
      return tieredIO2IOPS(prices, volumeSize)
    else if(volumeType === "gp3")
      return tieredGP3IOPS(prices, volumeSize)
    else throw "Only volume types io2 and gp3 are supported for iops pricing";
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

  // console.log('filting on volumeTypeMap[volumeType] ' + getVolumeTypeFullName(volumeType));
  // console.log('filting on usageTypeFull(volumeType) ' + usageTypeFull(volumeType));

  if(!filterStorageLib[storageType]) throw "Unknown storage type. Only storage, snapshot, and iops are supported";
  prices = prices.filter(filterStorageLib[storageType]);

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
  // console.log({tiers, priceTiers: JSON.stringify(priceTiers.map(x => x.price)), volumeSize})

  return totalPriceEBS(tiers, priceTiers, volumeSize);
}

function totalPriceEBS(tiers, priceTiers, volumeSize) {
  // console.log({volumeSize, tiers, priceTiers});
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