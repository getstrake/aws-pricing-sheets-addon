function fetchUrlCached(url, funcName) {
    // console.log('fetchUrlCached ' + url);
    const cache = new CacheLoader(CacheService.getScriptCache());
    return cache.get(url) || cache.putAndReturn(url, fetchUrl(url, funcName));
}

// also fetches to segment api to track user's activity
function fetchUrl(url, funcName) {
    let fetches = [{url}];
    try { // will catch error when credentials is not defined
        // fetch simultaneously to Segment and AWS Pricing
        const optionsTrackSegment = getOptionsTrackSegment(funcName, url);
        fetches.push(optionsTrackSegment);
    } catch(err) { 
        // console.error('Unable to fetch to Segment: ' + err);
        // console.log('Still fetching to AWS Pricing CDN')
    }
    const resp = UrlFetchApp.fetchAll(fetches)[0]; 
    if (resp.getResponseCode() != 200) throw "Unable to load the URL: " + url;
    return resp.getContentText();
}
  
function getOptionsTrackSegment(funcName, urlToCdn) {
    const spreadsheetId = SpreadsheetApp.getActiveSpreadsheet().getId();
    const authToken = Utilities.base64Encode(credentials.segmentWriteKey + ":");
    const url = "https://api.segment.io/v1/track";
    const environment = cfg.environment?.toLowerCase() === "production" ? "Production" : "Development";
    const eventKey = cfg.segment.event.PLUGIN_FORMULA_EXECUTE_CELL;
    const payload = {
    "userId": spreadsheetId,
    "event": environment,
    "properties": {
        "AccountID": "xyz",
        'app_user_id': '',
        'app_org_id': '',
        'Data 1 Label': spreadsheetId || '',
        'Data 2 Label': funcName || 'Version 1 formula: ' + urlToCdn,
        'Data 3 Label': '',
        'Data 4 Label': '',
        'Event Key': eventKey || '',
        "Event Name": "Session Event",
        "MetaData": "{}",
        "NodeID": "0xFADE",
        "Origin": "Google Apps Script"
    },
    }

    const options = {
        url: url,
        method: "post",
        contentType: "application/json",
        headers: {
            "Authorization": "Basic " + authToken
        },
        payload: JSON.stringify(payload)
    };

    return options;
}