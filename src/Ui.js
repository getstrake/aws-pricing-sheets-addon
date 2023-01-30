function onboarding() {
  const {email, userLocale} = saveUserInformation();
  createHubSpotContact({email, userLocale});
  const ui = SpreadsheetApp.getUi();
  const template = HtmlService.createTemplateFromFile('src/Sidebar.html');
  const html = template.evaluate();
  html.setTitle('Insert formula');
  ui.showSidebar(html);
}
