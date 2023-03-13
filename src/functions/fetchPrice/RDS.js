function fetchApiRDS(options, funcName) {
  options = getObjectWithValuesToLowerCase(options);
  const { dbEngine, instanceType, region, purchaseType, purchaseTerm, paymentOption } = options;

  if(!dbEngine) throw `Must specify DB engine`;
  if(!instanceType) throw `Must specify a DB instance type`;
  if(!region) throw 'Missing region';
  if(!purchaseType) throw 'Missing purchaseType';

  if(purchaseType === "reserved-instance") {
    if(!purchaseTerm) throw 'Missing purchaseTerm';
    if(!paymentOption) throw 'Missing paymentOption';
    if(!["1yr","3yr"].includes(purchaseTerm)) {
      throw `Only 1yr and 3yr purchase terms are supported for RDS RIs`
    }
    if(purchaseTerm === "3yr" && paymentOption === "no_upfront") {
      throw `The No-Upfront payment option is not supported for 3 year RDS RIs`
    }
  }

  const path = `/pricing/1.0/rds/region/${region}/${dbEngine}/${purchaseType}/single-az/index.json`;
  const url = `${cfg.baseHost}${path}`;
  let response;
  try {
    response = JSON.parse(fetchUrlCached(url, funcName));
  } catch(err) {
    throw 'Unable to find the price. Make sure you have the correct region, database engine and purchase type.'
  }   
  const prices = filterPricesRDS(response.prices, options);
  if (prices.length === 0)
    throw `Unable to find RDS instance ${instanceType} for DB engine ${dbEngine}`
  if (prices.length > 1)
    throw `Too many matches found for ${instanceType} for DB engine ${dbEngine}`
  const price = purchaseType === "ondemand" ?
    prices[0].price.USD :
    prices[0].calculatedPrice.effectiveHourlyRate.USD
  return parseFloat(price);
}

function filterPricesRDS(prices, options) {
  const rewritePurchaseType = {
    "reserved-instance": "reserved-only",
    "ondemand": "on-demand",
  }
  return prices.filter(price => {
    let basicFilter = price.attributes['aws:region'] == options.region &&
      price.attributes['aws:rds:term'] === rewritePurchaseType[options.purchaseType] &&
      price.attributes['aws:rds:instanceType'] === options.instanceType;
  
    if(options.purchaseType === "ondemand")
      return basicFilter;

    let reservedFilter = price.attributes['aws:offerTermLeaseLength'] === options.purchaseTerm &&
      price.attributes['aws:offerTermPurchaseOption'] === getPaymentOptionAttr(options.paymentOption);
    
    if(options.purchaseType === "reserved-instance")
      return  basicFilter && reservedFilter;
  })
}

function getPaymentOptionAttr(paymentOption) {
  const paymentOptionLib = {
    'no_upfront': 'No Upfront',
    'partial_upfront': 'Partial Upfront',
    'all_upfront': 'All Upfront',
  }
  const result = paymentOptionLib[paymentOption];
  if(!result) throw `Unknown payment option ${paymentOption}`;
  return result;
}