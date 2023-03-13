function analyticsWrapper(args, callback) {
  // this is moved to function fetchUrl in src/Fetch.js
  // and there we use fetchAll, so we can fetch to Segment and AWS Pricing at the same time for better performance
  // below you'll find the original code, it's slower because it requires seperates requests to Segment and Google Analytics
  // we also decided to leave out google analytics for now in function fetchAll

  return callback();

  // try { credentials } catch(err) { return callback(); }
  // if(!cfg.logCustomFunctionToAnalytics ||
  //    !credentials.measurement_id_analytics || 
  //    !credentials.api_secret_analytics) {
  //    return callback();
  // }

  // const startTime = Date.now();
  // const result = callback();
  // const timeExecution = Date.now() - startTime;
  // const email = getUserEmail();
  // const funcName = args.callee.name;
  // const options = {
  //   funcName, 
  //   timeExecution,
  //   email
  // };
  // if(cfg.environment?.toLowerCase() === "development") {
  //   validateAndSendToGoogleAnalytics(options)
  // } else if(cfg.environment?.toLowerCase() === "production") {
  //   options.debug = false;
  //   sendToGoogleAnalytics(options);
  // }

  // trackSegmentEvent({
  //   email, 
  //   eventKey: cfg.segment.event.PLUGIN_FORMULA_EXECUTE_CELL, 
  //   funcName, 
  //   timeExecution
  // })
  // return result;
}

function getUserEmail() {
  return PropertiesService.getUserProperties().getProperty('emailUser')
    || "Unknown email";
}

function getUserLocale() {
  return PropertiesService.getUserProperties().getProperty('userLocale')
    || "Unknown locale";
}

function validateAndSendToGoogleAnalytics(options) {
  options.debug = true;
  const test = sendToGoogleAnalytics(options);
  if(test?.response?.validationMessages?.length > 0)
    throw test.response.validationMessages.map(x => JSON.stringify(x)).join(". ");
  
  options.debug = false;
  return sendToGoogleAnalytics(options);
}

// if debug is true, it will send the data to the debug endpoint
// that debug endpoint returns 
function sendToGoogleAnalytics(parameters) {
  const {funcName, timeExecution, debug, email} = parameters;

  const emailFormattedForEventName = email
    .replace(/@/g, "_at_") // event name can't have @
    .replace(/\./g, "_dot_") // event name can't have .
    .replace(/\s/g, "_") // event name can't have spaces
    .replace(/[^\w]/g, "") // event name should be alphanumeric
    .slice(0,44); // max size event name is 44 chars

  const data = {
      "client_id": email,
      "user_id": email,
      "events": [
        {
          "name": emailFormattedForEventName,
          "params": {
            timeExecution,
            "session_id": Date.now(),
            email,
            functionName: funcName,
            funcAndTimeExecution: funcName + " " + timeExecution + "ms",
          }
        }
      ]
    };

  const options = {
    'method' : 'post',
    'contentType': 'application/json',
    'payload' : JSON.stringify(data)
  };
  const analyticsUrl = `https://www.google-analytics.com/${debug?"debug/":""}mp/collect?measurement_id=${credentials.measurement_id_analytics}&api_secret=${credentials.api_secret_analytics}`;
  const response = UrlFetchApp.fetch(analyticsUrl, options);
  
  let result = { code: response.getResponseCode() };
  try { 
    result.response = JSON.parse(response.getContentText())
  } catch(err) {}

  return result;
}