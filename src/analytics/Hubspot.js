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
          // if you want to register other custom fields, you have to add this column first to hubspot, otherwise the registration won't work!
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