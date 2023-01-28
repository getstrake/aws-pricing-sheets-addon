function analyticsWrapper(args, callback) {
  if(!cfg.logCustomFunctionToAnalytics) return callback();

  const startTime = Date.now();
  const result = callback();
  validateAndSendToGoogleAnalytics({
    funcName: args.callee.name, 
    args: [...args], 
    timeExecution: Date.now() - startTime,
  });
  return result;
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
  const {funcName, args, timeExecution, debug} = parameters;

  const email = getUserEmail() || "Unknown email";
  const userLocale = getUserLocale() || "Unknown locale";
  const scriptTimeZone = Session.getScriptTimeZone();
  const argumentsWithCommas = args.join(", ");
  const fullFunction = funcName + "(" + argumentsWithCommas + ")";

  const data = {
      "client_id": email,
      "user_id": email,
      "events": [
        {
          "name": funcName,
          "params": {
            timeExecution,
            "session_id": Date.now(),
            userLocale,
            scriptTimeZone,
            email,
            "function": fullFunction + " " + timeExecution + "s",
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