function EC2_EBS_GB(volumeType, volumeSize, region) {
  return fetchApiEBS({volumeType, volumeSize, region, storageType: "storage"})
}

function EC2_EBS_SNAPSHOT_GB(volumeSize, region) {
  return fetchApiEBS({volumeSize, region, storageType: "snapshot"})
}

function fetchApiEBS(options) {
    const {volumeSize, region} = options;
    const path =  `/pricing/1.0/ec2/region/${region}/ebs/index.json`;
    const url = `${cfg.baseHost}${path}`;
    const response = JSON.parse(fetchUrlCached(url));
    const prices = filterPricesEBS(response.prices, options);

    if(prices.length === 0)
      throw new Error(`No price found.\n\n ${JSON.stringify(options)}`);
    if(prices.length > 1)
      throw new Error(`Multiple prices found for ${JSON.stringify(options)}`);

    return parseFloat(prices[0].price.USD) * parseFloat(volumeSize) / 730;
}

const filterPricesEBS = (prices, options) => {
    const {volumeType, storageType} = options;
    const filterLib = {
      gp3: p => true,/// to do
      io2: p => true, /// to do
      filterStorageType: {
        storage: p => 
          p.attributes['aws:ec2:volumeType'] === 'General Purpose' &&
          p.attributes['aws:ec2:usagetype'].endsWith("EBS:VolumeUsage." + volumeType), // The usagetype is prefixed with a region abbrev. outside of UE1
        snapshot: p =>
          p.attributes['aws:ec2:usagetype'].endsWith("EBS:SnapshotUsage"),
        iops: p =>
          p.attributes['aws:ec2:usagetype'].endsWith('EBS:VolumeP-IOPS.piops')
      }
    }
    
    return prices.filter(filterLib[volumeType] || filterLib.filterStorageType[storageType]);
}