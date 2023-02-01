// Description: This is a workaround to send user info to Google Analytics from a custom function
// Custom functions (like AWS_EC2) don't have access to email and userLocale
// but they do have access to propertiesService
function saveUserInformation() {
  const email = Session.getActiveUser().getEmail();
  const userLocale = Session.getActiveUserLocale();
  PropertiesService.getUserProperties().setProperty('emailUser',email);
  PropertiesService.getUserProperties().setProperty('userLocale',userLocale);
  return {email, userLocale};
}