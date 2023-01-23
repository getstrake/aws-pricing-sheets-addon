function RDS_FROM_SETTINGS(settingsRange, dbEngine, instanceType, region) {
  // take settings
  // dbEngine, instanceType from arguments or settings?
  // overrule region
  fetchApiRDS(options);
}

function RDS(dbEngine, instanceType, region, purchaseType) {
  return fetchApiRDS({ dbEngine, instanceType, region, purchaseType, purchaseTerm, paymentOption });
}

function fetchApiRDS(options) {
  options = getObjectWithValuesToLowerCase(options);
  const { dbEngine, instanceType, region, purchaseType, purchaseTerm, paymentOption } = options;

  if(!dbEngine) throw `Must specify DB engine`;
  if(!instanceType) throw `Must specify a DB instance type`;
  if(!region) throw 'Missing region';
  if(!purchaseType) throw 'Missing purchaseType';
  // purchaseTerm?
  // paymentOption?

  const path = `/pricing/1.0/rds/region/${region}/${dbEngine}/${purchaseType}/single-az/index.json`;
  const url = `${cfg.baseHost}${path}`;
  const response = JSON.parse(fetchUrlCached(url));
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
    "ondemand": "ondemand",
  }
  return prices.filter(price => {
    let ret = price.attributes['aws:region'] == options.region &&
        price.attributes['aws:rds:term'] === rewritePurchaseType[options.purchaseType] &&
        price.attributes['aws:rds:instanceType'] === options.instanceType;
    if(options.purchaseType !== 'reserved-instance')
      return ret;
    
    if (!ret) { // TO DO: why?
        return ret
    }

    return price.attributes['aws:offerTermLeaseLength'] === options.purchaseTerm + "yr" &&
        price.attributes['aws:offerTermPurchaseOption'] === getPaymentOptionAttr(options.paymentOption)
  })
}

function getPaymentOptionAttr(paymentOption) {
  const paymentOptionLib = {
    'no_upfront': 'No Upfront',
    'partial_upfront': 'Partial Upfront',
    'all_upfront': 'All Upfront',
  }
  const result = paymentOptionLib[paymentOption];
  if(!result) throw `Unknown payment option ${this.settings.get('payment_option')}`;
  return result;
}