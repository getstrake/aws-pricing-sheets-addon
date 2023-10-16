function fetchApiRedshift(options, funcName) {
  options = getObjectWithValuesToLowerCase(options);
  const { instanceType, region, purchaseType, purchaseTerm, paymentOption } = options;

  if(!instanceType) throw `Must specify a DB instance type`;
  if(!region) throw 'Missing region';
  if(!purchaseType) throw 'Missing purchaseType';

  if(purchaseType === "reserved-instance") {
    if(!purchaseTerm) throw 'Missing purchaseTerm';
    if(!paymentOption) throw 'Missing paymentOption';
    if(!["1yr","3yr"].includes(purchaseTerm)) {
      throw `Only 1yr and 3yr purchase terms are supported for Redshift Is`
    }
    if(purchaseTerm === "3yr" && paymentOption === "no_upfront") {
      throw `The No-Upfront payment option is not supported for 3 year Redshift RIs`
    }
  }

  const path = `/redshift/region/${region}/${purchaseType}/${instanceType}/index.json`;
  const url = `${cfg.baseHost}${path}`;
  let response;
  try {
    response = JSON.parse(fetchUrlCached(url, funcName));
  } catch(err) {
    throw 'Unable to find the price. Make sure you have the correct region, database engine and purchase type.'
  }   
  const prices = filterPricesRedshift(response.prices, options);
  if (prices.length === 0)
    throw `Unable to find redshift instance ${instanceType}`
  if (prices.length > 1)
    throw `Too many matches found for ${instanceType}`
  const price = purchaseType === "ondemand" ?
    prices[0].price.USD :
    prices[0].calculatedPrice.effectiveHourlyRate.USD
  return parseFloat(price);
}

function filterPricesRedshift(prices, options) {
  const rewritePurchaseType = {
    "reserved-instance": "reserved-only",
    "ondemand": "on-demand",
  }
  return prices.filter(price => {
    let basicFilter = price.attributes['aws:region'] == options.region &&
      price.attributes['aws:redshift:term'] === rewritePurchaseType[options.purchaseType] &&
      price.attributes['aws:redshift:instanceType'] === options.instanceType;
  
    if(options.purchaseType === "ondemand")
      return basicFilter;

    let reservedFilter = price.attributes['aws:offerTermLeaseLength'] === options.purchaseTerm &&
      price.attributes['aws:offerTermPurchaseOption'] === getPaymentOptionAttr(options.paymentOption);
    
    if(options.purchaseType === "reserved-instance")
      return  basicFilter && reservedFilter;
  })
}

// function getPaymentOptionAttr
// can be found in RDS.js