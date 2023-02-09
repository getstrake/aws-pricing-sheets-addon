function onOpen(e) {
  SpreadsheetApp.getUi()
      .createAddonMenu()
      .addItem('How to use AWS Pricing', 'onboarding')
      .addToUi();
}

function onboarding() {
  const {email, userLocale} = saveUserInformation();
  createHubSpotContact({email, userLocale});
  const ui = SpreadsheetApp.getUi();
  const template = HtmlService.createTemplateFromFile('help_dialog_collapsed.html');
  const html = template.evaluate();
  html.setTitle('AWS Pricing Add-on');
  ui.showSidebar(html);
}
