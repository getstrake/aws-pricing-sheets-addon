function EC2_EBS_GB(volumeType, volumeSize, region) {
  return fetchApiEBS({ volumeType, volumeSize, region, storageType: "storage" })
}

function EC2_EBS_SNAPSHOT_GB(volumeSize, region) {
  return fetchApiEBS({ volumeSize, region, storageType: "snapshot" })
}

function EC2_EBS_IO1_IOPS(volumeSize, region) {
  return fetchApiEBS({ volumeType: 'io1', volumeSize, storageType: "iops", region });
}

function EC2_EBS_IO2_IOPS(volumeSize, region) {
  return fetchApiEBS({ volumeType: 'io2', volumeSize, storageType: "iops", region });
}

function EC2_EBS_GP3_IOPS(volumeSize, region) {
  return fetchApiEBS({volumeType: 'gp3', volumeSize, storageType: "iops", region});
}

function fetchApiEBS(options) {
  const { volumeSize, region } = options;
  const path = `/pricing/1.0/ec2/region/${region}/ebs/index.json`;
  const url = `${cfg.baseHost}${path}`;
  const response = JSON.parse(fetchUrlCached(url));
  const price = getPriceEBS(response.prices, options);
  return price * parseFloat(volumeSize) / 730;
}

const getPriceEBS = (prices, options) => {
  const { volumeType, storageType } = options;

  const filterVolumeLib = {
    gp3: () => tieredGP3IOPS(prices, options.volumeSize),
    io2: () => tieredIO2IOPS(prices, options.volumeSize),
  }
  if (filterVolumeLib[volumeType])
    return filterVolumeLib[volumeType]()
  
  const filterStorageLib = {
    storage: p =>
      p.attributes['aws:ec2:volumeType'] === 'General Purpose' &&
      p.attributes['aws:ec2:usagetype'].endsWith("EBS:VolumeUsage." + volumeType), // The usagetype is prefixed with a region abbrev. outside of UE1
    snapshot: p =>
      p.attributes['aws:ec2:usagetype'].endsWith("EBS:SnapshotUsage"),
    iops: p =>
      p.attributes['aws:ec2:usagetype'].endsWith('EBS:VolumeUsage.piops')
  }

  prices = prices.filter(filterStorageLib[storageType]);

  if (prices.length === 0)
    throw "Can not find instance";
  if (prices.length > 1)
    throw "Multiple prices found";

  return parseFloat(prices[0].price.USD);
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

  return totalPrice(tiers, priceTiers, volumeSize);
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

  return totalPrice(tiers, priceTiers, volumeSize);
}


function totalPrice(tiers, priceTiers, volumeSize) {
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