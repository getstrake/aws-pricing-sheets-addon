function identifySegment(email) {
  const authToken = Utilities.base64Encode(credentials.segmentWriteKey + ":"); // documentation: https://segment.com/docs/connections/sources/catalog/libraries/server/http-api/
  const url = "https://api.segment.io/v1/identify";
  const payload = {
    "userId": email,
    "traits": {
        "email": email
    }
  }
  const options = {
    method: "post",
    contentType: "application/json",
    headers: {
      "Authorization": "Basic " + authToken
    },
    payload: JSON.stringify(payload)
  };
  const response = UrlFetchApp.fetch(url, options);
  return response.getContentText();
}

function trackSegmentEvent({ email, eventKey, funcName, timeExecution, data4 }) {
  const authToken = Utilities.base64Encode(credentials.segmentWriteKey + ":");
  const url = "https://api.segment.io/v1/track";
  const payload = {
    "userId": email,
    "event": "Development",
    "properties": {
        "AccountID": "xyz",
        'Data 1 Label': email || '',
        'Data 2 Label': funcName || '',
        'Data 3 Label': timeExecution || '',
        'Data 4 Label': data4 || '',
        'Event Key': eventKey || '',
        "Event Name": "Session Event",
        "MetaData": "{}",
        "NodeID": "0xFADE",
        "Origin": "Google Apps Script"
    },
  }
  const options = {
    method: "post",
    contentType: "application/json",
    headers: {
      "Authorization": "Basic " + authToken
    },
    payload: JSON.stringify(payload)
  };
  const response = UrlFetchApp.fetch(url, options);
  return response.getContentText();
}