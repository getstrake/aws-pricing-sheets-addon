const cache = new CacheLoader(CacheService.getScriptCache());

function fetchApi(options) {
    const {instanceType, region, purchaseType, platform, offeringClass, purchaseTerm, paymentOption} = options;
    const path = `/pricing/1.0/ec2/region/${region}/${purchaseType}/${platform}/index.json`;
    const url = `${cfg.baseHost}${path}?timestamp=${Date.now()}`;
    const response = fetchUrlCached(url);
    const prices = filterPrices(response.prices, options);
    if(prices.length === 0)
      throw new Error(`No price found for ${JSON.stringify(options)}`);
    if(prices.length > 1)
      throw new Error(`Multiple prices found for ${JSON.stringify(options)}`);
    const price = purchaseType === "ondemand" ? 
      prices[0].price.USD : 
      prices[0].calculatedPrice.effectiveHourlyRate.USD
    return parseFloat(price);
}

const filterPrices = (prices, options) => {
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

function fetchUrlCached(url) {
    return cache.get(url) || cache.putAndReturn(url, fetchUrl(url));
}

function fetchUrl(url) {
    const resp = UrlFetchApp.fetch(url);
    if (resp.getResponseCode() != 200) throw "Unable to load the URL: " + url;
    return JSON.parse(resp.getContentText());
}