// inspiration: https://medium.com/geekculture/taking-away-the-pain-from-unit-testing-in-google-apps-script-98f2feee281d
class UnitTestingApp {
  constructor() {
    if (UnitTestingApp.instance) return UnitTestingApp.instance;
    UnitTestingApp.instance = this;
    return UnitTestingApp.instance;
  }

  /**
   * Tests whether conditions pass or not
   * @param {Boolean | Function} condition - The condition to check
   * @param {String} message - the message to display in the onsole
   * @return {void}
   */
  assert(condition, message) {
    try {
      if ("function" === typeof condition) condition = condition();
      if (condition) return `✔ PASSED: ${message}`;
      else return `❌ FAILED: ${message}`;
    } catch(err) {
      return `❌ FAILED: ${message} (${err})`;
    }
  }

  /**
   * Tests functions that throw error messages
   * @param {Function} callback - the function that you expect to return the error message
   * @param {String} errorMessage - the error message you are expecting
   * @param {String} message - the message to display in the console
   * @return {void}
   */
  catchErr(callback, errorMessage, message) {
    let error;
    let isCaught = false;
    try {
      callback();
    } catch (err) {
      error = err;
      isCaught = new RegExp(errorMessage).test(err);
    } finally {
      this.assert(isCaught, message);
    }
  }

  /**
   * Adds a new test to the prototype of the class
   * @param {String} name the name of the function
   * @param {Function} callback the function to add to the prototype of the class
   */
  addNewTest(name, callback) {
    UnitTestingApp.prototype[name] = callback;
  }
}