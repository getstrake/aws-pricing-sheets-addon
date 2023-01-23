
function fetchApiRDS_Storage(options) {
  options = getObjectWithValuesToLowerCase(options);
  const { storageType, storageSize, region } = options;

  if(!storageType) throw `Must specify storage type`;
  if(!storageSize) throw `Must specify storage size`;
  if(!region) throw 'Missing region';

  const path = '/pricing/1.0/rds/database-storage/index.json';
  const url = `${cfg.baseHost}${path}`;
  const response = JSON.parse(fetchUrlCached(url));
  const prices = filterRDSStorage(response.prices, options);

  if (prices.length === 0)
    throw `Can not find price for RDS storage type ${storageTypeStr(storageType)}`
  if (prices.length > 1)
      throw `Too many matches for RDS storage type ${storageTypeStr(storageType)}`
  
  const price = prices[0].price.USD;
  return parseFloat(price) * parseFlost(storageSize);
}

function filterRDSStorage(prices, options) {
  return prices.filter(price => 
          price.attributes['aws:productFamily'] === 'Database Storage' &&
          price.attributes['aws:rds:deploymentOption'] === 'Single-AZ' &&
          price.attributes['aws:rds:databaseEngine'] === 'Any' &&
          price.attributes['aws:region'] === options.region &&
          price.attributes['aws:rds:volumeType'] === storageTypeStr(storageType)
  )
}

function storageTypeStr(storageType) {
  const storageTypeLib = {
    'gp2': 'General Purpose',
    'piops': 'Provisioned IOPS',
    'magnetic': 'Magnetic',
    'aurora': 'General Purpose-Aurora',
  };
  return storageTypeLib[storageType] || "Unknown"
}