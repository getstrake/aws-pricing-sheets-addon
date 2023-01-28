function saveUserEmailAndLocale() {
  PropertiesService.getUserProperties().setProperty('emailUser',Session.getActiveUser().getEmail());
  PropertiesService.getUserProperties().setProperty('userLocale',Session.getActiveUserLocale());
}

function getUserEmail() {
  return PropertiesService.getUserProperties().getProperty('emailUser');
}

function getUserLocale() {
  return PropertiesService.getUserProperties().getProperty('emailUser');
}