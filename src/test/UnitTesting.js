// inspiration: https://medium.com/geekculture/taking-away-the-pain-from-unit-testing-in-google-apps-script-98f2feee281d
class UnitTestingApp {
  constructor() {
    if (UnitTestingApp.instance) return UnitTestingApp.instance;
    UnitTestingApp.instance = this;
    return UnitTestingApp.instance;
  }

  /**
   * Tests whether expected and actual are equal
   * @param {Number | String} expected - The expected value
   * @param {Number | String | Function} actual - The actual value or test
   * @param {String} message - the message to display in the onsole
   * @return {void}
   */
  areEqual(expected, actual, message) {
    try {
      message = message || this.getFunctionName(actual) + " === " + expected.toString();
      if ("function" === typeof actual) actual = actual();
      if (actual === expected) return `✔ ${message}`;
      else return `❌ ${message} but result was ${actual}`;
    } catch(err) {
      return `❌ ${message} (${err})`;
    }
  }

  /**
   * Tests whether expected and actual are equal (also for objects)
   * @param {Number | String | Object} expected - The expected value
   * @param {Number | String | Function} actual - The actual value or test
   * @param {String} message - the message to display in the onsole
   * @return {void}
   */
  areDeepEqual(expected, actual, message) {
    try {
      message = message || JSON.stringify(this.getFunctionName(actual)) + " === (deep equal) === " + JSON.stringify(expected);
      if ("function" === typeof actual) actual = actual();
      if (JSON.stringify(actual) === JSON.stringify(expected)) return `✔ ${message}`;
      else return `❌ ${message} but result was ${JSON.stringify(actual)}`;
    } catch(err) {
      return `❌ ${message} (${err})`;
    }
  }


  /**
   * Tests whether conditions pass or not
   * @param {Boolean | Function} test - The condition to check
   * @param {String} message - the message to display in the onsole
   * @return {void}
   */
  isTrue(test, message) {
    try {
      if ("function" === typeof test) test = test();
      if (test) return `✔ ${message}`;
      else return `❌ ${message}`;
    } catch(err) {
      return `❌ ${message} (${err})`;
    }
  }

  /**
   * Tests whether conditions pass or not
   * @param {Number | String} expected - The expected value
   * @param {Number | String | Function} actual - The actual value or test
   * @param {Number} epsilon - The maximum difference
   * @param {String} message - the message to display in the onsole
   * @return {void}
   */
  areClose(expected, actual, epsilon, message) {
    message = message || this.getFunctionName(actual) + " ~= " + expected;
    try {
      if ("function" === typeof actual) actual = actual();
      return this.isTrue(Math.abs(expected - actual) <= epsilon, message + '. the result was ' + actual);
    } catch(err) {
      return `❌ ${message} (${err})`;
    }
  }

  willThrow(callback, errorMessage) {
    let message = this.getFunctionName(callback) + " should throw: (" + errorMessage + ")";
    try {
      const result = callback();
      return `❌ ${message} but returned successfully this value: ${result}`;
    } catch(err) {
      return err == errorMessage ? `✔ ${message}` : `❌ ${message}. It threw error: (${err})`;
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
      this.areEqual(isCaught, message);
    }
  }

  getFunctionName(func) {
    if("function" !== typeof func) return func;
    return func.toString().replace(/\n/g,' ').replaceAll('() => ','').replaceAll('function() {','').replace(/\}$\s?/g,'').trim();
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