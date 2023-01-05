// EC2_OD("m5.xlarge", "us-east-1", "linux")
function test() {
    console.log(EC2_OD("m5.metal", "us-east-2", "windows"));
    console.log(RDS_STORAGE_GB("aurora", 4000, "us-west-1"));
}

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
    const purchaseType = "ondemand";
    const baseHost = 'https://cdn.x.macroscope.io/aws-pricing/retro';
    return fetchApi(baseHost, instanceType, region, purchaseType, platform);
}

function fetchApi(baseHost, instanceType, region, purchaseType, platform) {
    const path = Utilities.formatString('/pricing/1.0/ec2/region/%s/%s/%s/index.json',
            region, purchaseType, platform);
    const url = Utilities.formatString("%s%s?timestamp=%d",baseHost, path, Date.now());
    const response = fetchUrl(url);
    filterPrices = response.prices.filter(price => {
        return price.attributes['aws:ec2:instanceType'] === instanceType
    })
    return parseFloat(filterPrices[0].price.USD);
}

function fetchUrl(url) {
    // const expireTimeSeconds = 3600;
    // const cache = new CacheLoader(CacheService.getScriptCache());
    let resp = UrlFetchApp.fetch(url);
    if (resp.getResponseCode() != 200)
        throw "Unable to load the URL: " + url;
    
    return JSON.parse(resp.getContentText());
}
