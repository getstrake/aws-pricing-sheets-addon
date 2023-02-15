function onOpen(e) {
  SpreadsheetApp.getUi()
      .createAddonMenu()
      .addItem('How to use AWS Pricing', 'onboarding')
      .addToUi();
}

/**
 * The onInstall(e) trigger runs automatically when a user installs an Editor add-on from within Google Docs, Sheets, Slides, or Forms. The trigger won't run when a user installs the add-on from the Google Workspace Marketplace website.
 * @param {Event} e The onInstall event.
 * @see https://developers.google.com/apps-script/guides/triggers#oninstalle
 */
function onInstall(e) {
  onOpen(e);
  try { onboarding() } catch(err) { }
}

function onboarding() {
  const {email} = saveUserInformation();
  createHubSpotContact(email);
  const ui = SpreadsheetApp.getUi();
  const template = HtmlService.createTemplateFromFile('help_dialog_collapsed.html');
  const html = template.evaluate();
  html.setTitle('AWS Pricing Add-on');
  ui.showSidebar(html);
}

function buildSideBar() {
  try {
    const {email} = saveUserInformation
    createHubSpotContact(email);
  } catch(err) {}

  return CardService.newCardBuilder()
      .setName("AWS Pricing")
      .setHeader(CardService.newCardHeader().setTitle("Use menu Extensions"))
      .build();
}