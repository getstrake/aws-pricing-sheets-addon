function fetchApiEC2(options, funcName) {
  options = getObjectWithValuesToLowerCase(options);
  const { instanceType, region, purchaseType, platform, offeringClass, purchaseTerm, paymentOption } = options;

  if(!region) throw 'Missing region';
  if(!instanceType) throw 'Missing instanceType';
  if(!purchaseType) throw 'Missing purchaseType';
  if(!platform) throw 'Missing platform';

  const path = `/pricing/1.0/ec2/region/${region}/${purchaseType}/${platform}/index.json`;
  const url = `${cfg.baseHost}${path}`;
  let response;
  try {
    response = JSON.parse(fetchUrlCached(url, funcName));
  } catch(err) {
    throw 'Unable to find the price. Make sure you have the correct region, purchase type and platform.'
  }   
  const prices = filterPricesEC2(response.prices, options);
  if (prices.length === 0)
    throw "Can not find instance";
  if (prices.length > 1)
    throw "Found too many instances that matched ${instanceType}";
  const price = purchaseType === "ondemand" ?
    prices[0].price.USD :
    prices[0].calculatedPrice.effectiveHourlyRate.USD
  return parseFloat(price);
}

const filterPricesEC2 = (prices, options) => {
  const { purchaseType, instanceType, offeringClass, paymentOption, purchaseTerm } = options;

  if(purchaseType === "reserved-instance") {
    if(!offeringClass) throw 'Missing offeringClass';
    if(!purchaseTerm) throw 'Missing purchaseTerm';
    if(!paymentOption) throw 'Missing paymentOption';
  }

  const paymentOptionLib = {
    'all_upfront': 'All Upfront',
    'no_upfront': 'No Upfront',
    'partial_upfront': 'Partial Upfront'
  }
  const filterReserved = p =>
    p.attributes['aws:ec2:instanceType'] === instanceType &&
    p.attributes['aws:offerTermOfferingClass'] === offeringClass &&
    p.attributes['aws:offerTermPurchaseOption'] === paymentOptionLib[paymentOption] &&
    p.attributes['aws:offerTermLeaseLength'] === purchaseTerm;
  const filterOnDemand = p =>
    p.attributes['aws:ec2:instanceType'] === instanceType;

  if(purchaseType === "ondemand")
    return prices.filter(filterOnDemand);

  if(purchaseType === "reserved-instance")
    return prices.filter(filterReserved);
}