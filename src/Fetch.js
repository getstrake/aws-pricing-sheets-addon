const cache = new CacheLoader(CacheService.getScriptCache());

function fetchUrlCached(url) {
    console.log('fetching ' + url);
    return cache.get(url) || cache.putAndReturn(url, fetchUrl(url));
}

function fetchUrl(url) {
    const resp = UrlFetchApp.fetch(url);
    if (resp.getResponseCode() != 200) throw "Unable to load the URL: " + url;
    return resp.getContentText();
}