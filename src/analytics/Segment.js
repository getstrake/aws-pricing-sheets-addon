function identifySegment(email, spreadsheetId) {
  try {
    const authToken = Utilities.base64Encode(credentials.segmentWriteKey + ":"); // documentation: https://segment.com/docs/connections/sources/catalog/libraries/server/http-api/
    const url = "https://api.segment.io/v1/identify";
    const payload = {
      "userId": spreadsheetId,
      "traits": {
          "email": email,
          "spreadsheet_id": spreadsheetId,
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
  } catch(err) { 
    // console.log(err);
  }
}

function trackSegmentEvent({ userId, eventKey, funcName, timeExecution, data4 }) {
  try {
    const authToken = Utilities.base64Encode(credentials.segmentWriteKey + ":");
    const url = "https://api.segment.io/v1/track";
    const environment = cfg.environment?.toLowerCase() === "production" ? "Production" : "Development";
    const payload = {
      "userId": userId,
      "event": environment,
      "properties": {
          "AccountID": "xyz",
          'app_user_id': '',
          'app_org_id': '',
          'Data 1 Label': userId || '',
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

  } catch(err) { 
    // console.log(err);
  }
}