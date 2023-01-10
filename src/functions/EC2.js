
/**
 * Returns the on-demand pricing for given instance type.
 *
 * @param {"m5.xlarge"} instanceType Instance type, eg. "m5.xlarge"
 * @param {"us-east-2"} region
 * @param {"linux"} platform
 * @returns price
 * @customfunction
 */
function EC2_OD(instanceType, region, platform) {
    return fetchApiEC2({instanceType, region, purchaseType: "ondemand", platform});
  }
  
  /**
  * Returns the reserved instance pricing for the given instance type and purchase options.
  * 
  * @param {"m5.xlarge"} instanceType Instance type, eg. "m5.xlarge"
  * @param {"us-east-2"} region
  * @param {"linux"} platform Instance platform, eg. "linux", "windows", etc.
  * @param {"convertible"} offeringClass Either "standard" or "convertible"
  * @param {1} purchaseTerm Duration of RI in years (1 or 3)
  * @param {"all_upfront"} paymentOption Payment terms (no_upfront, partial_upfront, all_upfront)
  * @returns price
  * @customfunction
  */
  function EC2_RI(instanceType, region, platform, offeringClass,
    purchaseTerm, paymentOption) {
    return fetchApiEC2({instanceType, region, purchaseType: "reserved-instance", platform, offeringClass, purchaseTerm, paymentOption})
  }

function fetchApiEC2(options) {
  const {instanceType, region, purchaseType, platform, offeringClass, purchaseTerm, paymentOption} = options;
  const path = `/pricing/1.0/ec2/region/${region}/${purchaseType}/${platform}/index.json`;
  const url = `${cfg.baseHost}${path}?timestamp=${Date.now()}`;
  const response = JSON.parse(fetchUrlCached(url));
  const prices = filterPricesEC2(response.prices, options);
  if(prices.length === 0)
    throw new Error(`No price found.\n\n ${JSON.stringify(options)}`);
  if(prices.length > 1)
    throw new Error(`Multiple prices found for ${JSON.stringify(options)}`);
  const price = purchaseType === "ondemand" ? 
    prices[0].price.USD : 
    prices[0].calculatedPrice.effectiveHourlyRate.USD
  return parseFloat(price);
}

const filterPricesEC2 = (prices, options) => {
  const {purchaseType, instanceType, offeringClass, paymentOption, purchaseTerm} = options;
  const paymentOptionLib = {  
     'all_upfront': 'All Upfront',
     'no_upfront': 'No Upfront',
     'partial_upfront': 'Partial Upfront'
  }
  const filterReserved = p => 
      p.attributes['aws:ec2:instanceType'] === instanceType &&
      p.attributes['aws:offerTermOfferingClass'] === offeringClass &&
      p.attributes['aws:offerTermPurchaseOption'] === paymentOptionLib[paymentOption] &&
      p.attributes['aws:offerTermLeaseLength'] === purchaseTerm + 'yr';
  const filterOnDemand = p => 
      p.attributes['aws:ec2:instanceType'] === instanceType;
      
  return purchaseType === "ondemand" ? 
    prices.filter(filterOnDemand) : 
    prices.filter(filterReserved);
}