const cacheLoader = new CacheLoader(CacheService.getScriptCache());

function fetchApi(options) {
    const {instanceType, region, purchaseType, platform, offeringClass, purchaseTerm, paymentOption} = options;
    const path = `/pricing/1.0/ec2/region/${region}/${purchaseType}/${platform}/index.json`;
    const url = `${cfg.baseHost}${path}?timestamp=${Date.now()}`;
    const response = fetchUrl(url);
    const filteredPrices = filterPrices(response.prices, {purchaseType, instanceType, offeringClass, paymentOption, purchaseTerm});
    const price = purchaseType === "ondemand" ? 
      filteredPrices[0].price.USD : 
      filteredPrices[0].calculatedPrice.effectiveHourlyRate.USD
    return parseFloat(price);
}

const filterPrices = (prices, {purchaseType, instanceType, offeringClass, paymentOption, purchaseTerm}) => {
    const paymentOptionLib = {  
       'all_upfront': 'All Upfront',
       'no_upfront': 'No Upfront',
       'partial_upfront': 'Partial Upfront'
    }
    const filterReserved = price => 
        price.attributes['aws:ec2:instanceType'] === instanceType &&
        price.attributes['aws:offerTermOfferingClass'] === offeringClass &&
        price.attributes['aws:offerTermPurchaseOption'] === paymentOptionLib[paymentOption] &&
        price.attributes['aws:offerTermLeaseLength'] === purchaseTerm + 'yr';
    const filterOnDemand = price => {
        return price.attributes['aws:ec2:instanceType'] === instanceType;
    }
    return purchaseType === "ondemand" ? 
      prices.filter(filterOnDemand) : 
      prices.filter(filterReserved);
}

function fetchUrlCached(url) {
    return cacheLoader.get(url) || cacheLoader.putAndReturn(url, fetchUrl(url));
}

function fetchUrl(url) {
    let resp = UrlFetchApp.fetch(url);
    if (resp.getResponseCode() != 200) throw "Unable to load the URL: " + url;
    return JSON.parse(resp.getContentText());
}