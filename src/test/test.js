function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Test')
    .addItem('Parallel testing','showTest')
    .addToUi();
}

function showTest() {
  const ui = SpreadsheetApp.getUi();
  const template = HtmlService.createTemplateFromFile('src/test/TestSuite.html');
  template.tests = "1 2 3 4 5 6".split(" ").map(x => 'test' + x);
  ui.showSidebar(template.evaluate());
}

function test(testName) {
  const test = new UnitTestingApp();
  switch (testName) {
    case 'test1':
      return test.assert(3 === 3, '3 === 3');
    case 'test2':
      return test.assert(3 === 4, '3 === 4');
    case 'test3':
      return test.assert("3" === 3, '"3" === 3');
    case 'test4':
      return test.assert(3-1 === 2, '3-1 === 2');
    case 'test5':
      return test.assert(2 === 2, '2 === 2');
    case 'test6':
      return test.assert("3"+3 === 33, '"3"+3 === 33');
    default:
      return `Test ${testName} is not defined`;
  }
}