function saveUserEmail() {
  PropertiesService.getUserProperties().setProperty('emailUser',Session.getActiveUser().getEmail());
}

function resetUserEmail() {
  PropertiesService.getUserProperties().deleteProperty('emailUser');
}

function getUserEmail() {
  return PropertiesService.getUserProperties().getProperty('emailUser');
}