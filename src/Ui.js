function showUi() {
  const ui = SpreadsheetApp.getUi();
  const template = HtmlService.createTemplateFromFile('Sidebar.html');
  const html = template.evaluate();
  html.setTitle('Insert formula');
  ui.showSidebar(html);
}
