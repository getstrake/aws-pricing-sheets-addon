function createHubSpotContact(email) {
  try { credentials } catch(err) { return; }
  if(!credentials.accessTokenHubSpot || !email) {
    return;
  }
  var url = "https://api.hubapi.com/crm/v3/objects/contacts";

  var data = {
      "properties": { // all property keys should be lowercase
          email,
          "lastname": email.split("@")[0],
          // "phone": "(123) 456-123456",
          // "website": "test.nl"
      }
  }
  var headers = {
      'authorization': 'Bearer ' + credentials.accessTokenHubSpot
  };

  var options = {
      "method": "POST",
      "headers": headers,
      "contentType": "application/json",
      "payload": JSON.stringify(data)
  }

  try {
    var response = UrlFetchApp.fetch(url, options);
    // console.log(`Added user ${email} to Hubspot`)
  } catch(err) { 
    // console.log(err);
  }
}