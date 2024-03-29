function fetchApiRDSStorage(options, funcName) {
  options = getObjectWithValuesToLowerCase(options);
  const { storageType, storageSize, region } = options;

  if(!storageType) throw `Must specify storage type`;
  if(!storageTypeStr(options.storageType)) throw 'Invalid storage type';
  if(!storageSize) throw `Must specify storage size`;
  if(!region) throw 'Missing region';
  if(isNaN(parseFloat(storageSize))) throw 'Invalid storage size';

  const path = `/rds/database-storage/${region}/single-az/index.json`;
  const url = `${cfg.baseHost}${path}`;
  let response;
  try {
    response = JSON.parse(fetchUrlCached(url, funcName));
  } catch(err) {
    throw 'We encountered a problem while fetching the price. Please try again later.'
  }   
  const prices = filterRDSStorage(response.prices, options);

  if (prices.length === 0)
    throw `Can not find price for RDS storage type ${storageTypeStr(storageType)} from storageType ${storageType}`
  if (prices.length > 1)
      throw `Too many matches for RDS storage type ${storageTypeStr(storageType)} from storageType ${storageType}`
  
  const price = prices[0].price.USD;
  return parseFloat(price) * parseFloat(storageSize) / cfg.hoursPerMonth;
}

function filterRDSStorage(prices, options) {
  return prices.filter(price => 
          // price.attributes['aws:productFamily'] === 'Database Storage' && // this attribute is left out, and is already filtered out
          price.attributes['aws:deploymentOption'] === 'Single-AZ' &&
          price.attributes['aws:rds:dbEngine'] === 'Any' &&
          price.attributes['aws:region'] === options.region &&
          price.attributes['aws:rds:volumetype'] === storageTypeStr(options.storageType)
  )
}

function storageTypeStr(storageType) {
  const storageTypeLib = {
    'gp2': 'General Purpose',
    'piops': 'Provisioned IOPS',
    'magnetic': 'Magnetic',
    'aurora': 'General Purpose-Aurora',
  };
  return storageTypeLib[storageType];
}