function doGet(e) {
  if(e.parameter.baseHost)
    cfg.baseHost = e.parameter.baseHost;
  if(e.parameter.formula)
    return executeFormulaViaWebApp(e);
  const template = HtmlService.createTemplateFromFile('src/test/TestSuite.html');
  template.tests = {...getEBSTests(), ...getEC2Tests(), ...getRDSFunctionTests(), ...getRDSStorageTests(), ...getFunctionTests()};  
  template.baseHost = e.parameter.baseHost || cfg.baseHost;
  return template.evaluate();
}

function executeFormulaViaWebApp(e) {
  try {
    const formula = e.parameter.formula;
    const functionName = formula.split("(")[0];
    const whitelistedFormulas = getWhitelistedFormulas();
    if(!whitelistedFormulas.includes(functionName)) return returnJson({success: false, message: 'Formula is not whitelisted'});
    const result = eval(formula);
    return returnJson({success: true, result: result})
  } catch(err) {
    return returnJson({success: false, message: JSON.stringify(err)});
  }
}

function returnJson(content) {
  return ContentService.createTextOutput(JSON.stringify(content) ).setMimeType(ContentService.MimeType.JSON); 
}

// test the web app in the sidebar in the spreadsheet
function testWebApp() {
  const ui = SpreadsheetApp.getUi();
  ui.showSidebar(doGet());
}

// Run tests in spreadsheet sidebar with the showTest functions below
function showTestEBS() {
  showTest(getEBSTests());
}

function showTestEC2() {
  showTest(getEC2Tests());
}

function showTestRDSFunction() {
  showTest(getRDSFunctionTests());
}

function showTestRDSStorageFunction() {
  showTest(getRDSStorageTests());
}

function showTestFunctions() {
  showTest(getFunctionTests());
}

function catchError(func) {
  try {
    return func();
  } catch(err) {
    return "❌ " + err;
  }
}

// These functions will be called when you run the test suite in the sidebar/web app
function EC2Test(chapter, testIndex, baseHost) {
  if(baseHost) cfg.baseHost = baseHost;
  return catchError(() => getEC2Tests()["EC2Test"][chapter][testIndex]);
}

function EBSTest(chapter, testIndex, baseHost) {
  if(baseHost) cfg.baseHost = baseHost;
  return catchError(() => getEBSTests()["EBSTest"][chapter][testIndex]);
}

function RDSFunctionTest(chapter, testIndex, baseHost) {
  if(baseHost) cfg.baseHost = baseHost;
  return catchError(() => getRDSFunctionTests()["RDSFunctionTest"][chapter][testIndex]);
}

function RDSStorageTest(chapter, testIndex, baseHost) {
  if(baseHost) cfg.baseHost = baseHost;
  return catchError(() => getRDSStorageTests()["RDSStorageTest"][chapter][testIndex]);
}

function FunctionTest(chapter, testIndex, baseHost) {
  if(baseHost) cfg.baseHost = baseHost;
  return catchError(() => getFunctionTests()["FunctionTest"][chapter][testIndex]);
}

function getEBSTests() {
  const t = new UnitTestingApp();
  let s = [ // testing range
      ['region', 'us-east-1']
  ];
  const tests = {
    "EBS GP2": [
    t.areClose(400.0 * (0.10/730.0), () => EC2_EBS_GP2_GB("400", "us-east-1"), 0.000001),
    t.areClose(400.0 * (0.10/730.0), () => EC2_EBS_GP2_GB("400", "us-east-2"), 0.000001),
    t.areClose(400.0 * (0.10/730.0), () => AWS_EBS("gp2","storage","400", "us-east-1"), 0.000001),
    t.areClose(400.0 * (0.10/730.0), () => AWS_EBS("gp2","storage","400", "us-east-2"), 0.000001)


],"EBS GP3": [
    t.areClose(400.0 * (0.08/730.0), () => EC2_EBS_GP3_GB("400", "us-east-1"), 0.000001),
    t.areClose(400.0 * (0.08/730.0), () => EC2_EBS_GP3_GB("400", "us-east-2"), 0.000001),
    t.areClose(400.0 * (0.08/730.0), () => AWS_EBS("gp3","storage","400", "us-east-1"), 0.000001),
    t.areClose(400.0 * (0.08/730.0), () => AWS_EBS("gp3","storage","400", "us-east-2"), 0.000001)


],"EBS IO1 IOPs": [
    t.areClose(15000 * (0.065/730.0), () => EC2_EBS_IO1_IOPS(15000, "us-east-1"), 0.000001),
    t.areClose(20000 * (0.072/730.0), () => EC2_EBS_IO1_IOPS(20000, "ca-central-1"), 0.000001),
    t.areClose(15000 * (0.065/730.0), () => AWS_EBS("io1","iops",15000, "us-east-1"), 0.000001),
    t.areClose(20000 * (0.072/730.0), () => AWS_EBS("io1","iops",20000, "ca-central-1"), 0.000001)


],"EBS IO2 IOPs": [
    t.areClose(15000 * (0.065/730.0), () => EC2_EBS_IO2_IOPS(15000, "us-east-1"), 0.000001),
    t.areClose(20000 * (0.072/730.0), () => EC2_EBS_IO2_IOPS(20000, "ca-central-1"), 0.000001),
    t.areClose(15000 * (0.065/730.0), () => AWS_EBS("io2","iops",15000, "us-east-1"), 0.000001),
    t.areClose(20000 * (0.072/730.0), () => AWS_EBS("io2","iops",20000, "ca-central-1"), 0.000001)


],"EBS IO2 IOPs - tiered": [
    t.areClose(32000 * (0.065/730.0) + (60000-32000) * (0.0455/730.0),
     () => EC2_EBS_IO2_IOPS(60000, "us-east-1"), 0.000001),

     t.areClose(32000 * (0.065/730.0) + 32000 * (0.0455/730.0) + (70000-64000) * (0.03185/730.0),
     () => EC2_EBS_IO2_IOPS(70000, "us-east-1"), 0.000001),

     t.areClose(32000 * (0.065/730.0) + (60000-32000) * (0.0455/730.0),
      () => AWS_EBS("io2","iops",60000, "us-east-1"), 0.000001),
 
      t.areClose(32000 * (0.065/730.0) + 32000 * (0.0455/730.0) + (70000-64000) * (0.03185/730.0),
      () => AWS_EBS("io2","iops",70000, "us-east-1"), 0.000001)


],"EBS GP3 IOPs - tiered": [
     t.areClose(0.0, () => EC2_EBS_GP3_IOPS(2800, "us-east-1"), 0.000001),

     t.areClose((7000 - 3000) * (0.005/730.0), () => EC2_EBS_GP3_IOPS(7000, "us-east-1"), 0.000001),

     t.areClose(0.0, () => AWS_EBS("gp3","iops",2800, "us-east-1"), 0.000001),

     t.areClose((7000 - 3000) * (0.005/730.0), () => AWS_EBS("gp3","iops",7000, "us-east-1"), 0.000001)


],"EBS Snapshots": [
    t.areClose(2500 * (0.05/730.0), () => EC2_EBS_SNAPSHOT_GB(2500, "us-east-1"), 0.000001),
    t.areClose(5500 * (0.055/730.0), () => EC2_EBS_SNAPSHOT_GB(5500, "ca-central-1"), 0.000001),
    t.areClose(2500 * (0.05/730.0), () => AWS_EBS(null, "snapshot", 2500, "us-east-1"), 0.000001),
    t.areClose(5500 * (0.055/730.0), () => AWS_EBS(null, "snapshot", 5500, "ca-central-1"), 0.000001)


],"EBS storage tests": [
    t.areClose(550.0 * (0.05/730.0), () => EC2_EBS_MAGNETIC_GB(550.0, "us-east-1"), 0.000001),
    t.areClose(550.0 * (0.125/730.0), () => EC2_EBS_IO1_GB(550.0, "us-east-1"), 0.000001),
    t.areClose(550.0 * (0.125/730.0), () => EC2_EBS_IO2_GB(550.0, "us-east-1"), 0.000001),
    t.areClose(550.0 * (0.045/730.0), () => EC2_EBS_ST1_GB(550.0, "us-east-1"), 0.000001),
    t.areClose(550.0 * (0.015/730.0), () => EC2_EBS_SC1_GB(550.0, "us-east-1"), 0.000001),

    t.areClose(550.0 * (0.05/730.0), () => AWS_EBS("magnetic","storage",550.0, "us-east-1"), 0.000001),
    t.areClose(550.0 * (0.125/730.0), () => AWS_EBS("io1","storage",550.0, "us-east-1"), 0.000001),
    t.areClose(550.0 * (0.125/730.0), () => AWS_EBS("io2","storage",550.0, "us-east-1"), 0.000001),
    t.areClose(550.0 * (0.045/730.0), () => AWS_EBS("st1","storage",550.0, "us-east-1"), 0.000001),
    t.areClose(550.0 * (0.015/730.0), () => AWS_EBS("sc1","storage",550.0, "us-east-1"), 0.000001)


],"EBS with settings range in version 1": [
    t.areClose(400.0 * (0.10/730.0), () => EC2_EBS_GP2_GB([['region', 'us-east-1']], "400"), 0.000001),
    t.areClose(400.0 * (0.10/730.0), () => EC2_EBS_GP2_GB([['region', 'us-east-1']], 400), 0.000001),
    t.areClose(400.0 * (0.11/730.0), () => EC2_EBS_GP2_GB([['region', 'us-east-1']], 400, "ca-central-1"), 0.000001),
    t.areClose(400.0 * (0.11/730.0), () => EC2_EBS_GP2_GB([['region', 'us-east-1']], 400, "CA-CENTRAL-1"), 0.000001),

    t.areClose(400.0 * (0.10/730.0), () => EC2_EBS_GB([['region', 'us-east-1']], "gp2", 400), 0.000001),
    t.areClose(400.0 * (0.10/730.0), () => EC2_EBS_GB([['region', 'us-east-1']], "GP2", 400), 0.000001),
    t.areClose(400.0 * (0.125/730.0), () => EC2_EBS_GB([['region', 'us-east-1']], "io1", 400), 0.000001),

    t.areClose(10000 * (0.065/730.0), () => EC2_EBS_IO1_IOPS([['region', 'us-east-1']], 10000), 0.000001),
    t.areClose(10000 * (0.072/730.0), () => EC2_EBS_IO1_IOPS([['region', 'us-east-1']], 10000, "ca-central-1"), 0.000001),

    t.areClose(10000 * (0.065/730.0), () => EC2_EBS_IO2_IOPS([['region', 'us-east-1']], 10000), 0.000001),
    t.areClose(10000 * (0.072/730.0), () => EC2_EBS_IO2_IOPS([['region', 'us-east-1']], 10000, "ca-central-1"), 0.000001),

    t.areClose(4000 * (0.05/730.0), () => EC2_EBS_SNAPSHOT_GB([['region', 'us-east-1']], 4000), 0.000001),
    t.areClose(4000 * (0.055/730.0), () => EC2_EBS_SNAPSHOT_GB([['region', 'us-east-1']], 4000, "ca-central-1"), 0.000001)


],"EBS invalid configs": [
    t.willThrow(function() {
      return EC2_EBS_GB([['region', 'us-east-1']], "gp1", 400)
    }, "invalid EBS volume type"),

    t.willThrow(function() {
      return EC2_EBS_GP2_GB(400, undefined)
    }, "must specify region"),

    t.willThrow(function() {
      return EC2_EBS_GP2_GB(undefined, "us-east-1")
    }, "unable to parse volume units"),

    t.willThrow(function() {
      return EC2_EBS_GP2_GB("foo", "us-east-1")
    }, "unable to parse volume units"),

    t.willThrow(function() {
      return EC2_EBS_GB(s, 400, "gp2")
    }, "invalid EBS volume type"),

    t.willThrow(function() {
      return AWS_EBS("gp2","storage",400, undefined)
    }, "must specify region"),

    t.willThrow(function() {
      return AWS_EBS("gp2","storage", undefined, "us-east-1")
    }, "unable to parse volume units"),

    t.willThrow(function() {
      return AWS_EBS("gp2","storage", "foo", "us-east-1")
    }, "unable to parse volume units"),
  ]};
  return {"EBSTest": tests}// executes the tests in google apps script via EBSTest function
}

function getEC2Tests() {
  const t = new UnitTestingApp();
  let settings = [
    ["region", "us-east-1"],
    ["purchase_term", "ondemand"],
    ["operating_system", "linux"]
  ];
  const tests =  {"EC2 on-demand": [
        t.areEqual(0.192, () => EC2_OD("m5.xlarge", "us-east-1", "linux")),
        t.areEqual(0.214, () => EC2_OD("m5.xlarge", "ca-central-1", "linux")),
        t.areEqual(0.192, () => EC2_LINUX_OD("m5.xlarge", "us-east-1")),
        t.areEqual(0.214, () => EC2_LINUX_OD("m5.xlarge", "ca-central-1")),
        t.areEqual(0.252, () => EC2_RHEL_OD("m5.xlarge", "us-east-1")),
        t.areEqual(0.248, () => EC2_SUSE_OD("m5.xlarge", "us-east-1")),
        t.willThrow(function() {
            EC2_OD("m5.xlarge", "us-east-1", undefined)
        }, "Missing platform"),
        t.willThrow(function() {
            EC2_LINUX_OD("mX5.xlarge", "us-east-1")
        }, "Unable to find the price. Make sure you have the correct region, purchase type and platform."),

        t.areEqual(0.192, () => AWS_EC2("ondemand", "m5.xlarge", "us-east-1", "linux")),
        t.areEqual(0.214, () => AWS_EC2("ondemand", "m5.xlarge", "ca-central-1", "linux")),
        t.areEqual(0.192, () => AWS_EC2("ondemand", "m5.xlarge", "us-east-1", "linux")),
        t.areEqual(0.214, () => AWS_EC2("ondemand", "m5.xlarge", "ca-central-1", "linux")),
        t.areEqual(0.252, () => AWS_EC2("ondemand", "m5.xlarge", "us-east-1", "rhel")),
        t.areEqual(0.248, () => AWS_EC2("ondemand", "m5.xlarge", "us-east-1", "suse")),
        t.willThrow(function() {
          AWS_EC2("ondemand", "m5.xlarge", "us-east-1", undefined)
        }, "Missing platform"),
        t.willThrow(function() {
          AWS_EC2("ondemand", "mX5.xlarge", "us-east-1", "linux")
        }, "Unable to find the price. Make sure you have the correct region, purchase type and platform."),

    ],"EC2 Windows on-demand": [
        t.areEqual(0.376, () => EC2_WINDOWS_OD("m5.xlarge", "us-east-1")),
        t.areEqual(0.398, () => EC2_WINDOWS_OD("m5.xlarge", "ca-central-1")),
        t.areEqual(0.376, () => AWS_EC2("ondemand", "m5.xlarge", "us-east-1", "windows")),
        t.areEqual(0.398, () => AWS_EC2("ondemand", "m5.xlarge", "ca-central-1", "windows")),
  ],"EC2 previous generation": [
        t.areEqual(0.35, () => EC2_LINUX_OD("m1.xlarge", "us-east-1")),
        t.areEqual(6.82, () => EC2_LINUX_OD("i2.8xlarge", "us-east-1")),
        t.areEqual(0.35, () => AWS_EC2("ondemand","m1.xlarge", "us-east-1","linux")),
        t.areEqual(6.82, () => AWS_EC2("ondemand","i2.8xlarge", "us-east-1","linux")),
  ],"EC2 case sensitivity": [
        t.areEqual(0.192, () => EC2_LINUX_OD("M5.XLARGE", "US-EAST-1")),
        t.areEqual(0.192, () => AWS_EC2("ondemand","M5.XLARGE", "US-EAST-1","linux")),
  // })
  ],"EC2 MSSQL": [
        t.areEqual(0.282, () => EC2_LINUX_MSSQL_OD("m5.xlarge", "ca-central-1", "web")),
        t.areEqual(0.694, () => EC2_LINUX_MSSQL_OD("m5.xlarge", "ca-central-1", "std")),
        t.areEqual(1.714, () => EC2_LINUX_MSSQL_OD("m5.xlarge", "ca-central-1", "enterprise")),
        t.areEqual(0.466, () => EC2_WINDOWS_MSSQL_OD("m5.xlarge", "ca-central-1", "web")),
        t.areEqual(0.282, () => EC2_LINUX_MSSQL_OD("m5.xlarge", "ca-central-1", "WEB")),
        t.willThrow(function() {
            EC2_LINUX_MSSQL_OD("m5.xlarge", "ca-central-1", undefined)
        }, "Missing SQL License"),
        t.areEqual(0.282, () => AWS_EC2("ondemand","m5.xlarge", "ca-central-1", "linux_web")),
        t.areEqual(0.282, () => AWS_EC2("ondemand","m5.xlarge", "ca-central-1", "linux", "", "", "", "web")),
        t.areEqual(0.694, () => AWS_EC2("ondemand","m5.xlarge", "ca-central-1", "linux_std")),
        t.areEqual(1.714, () => AWS_EC2("ondemand","m5.xlarge", "ca-central-1", "linux_enterprise")),
        t.areEqual(0.466, () => EC2_WINDOWS_MSSQL_OD("m5.xlarge", "ca-central-1", "web")),
        t.areEqual(0.282, () => AWS_EC2("ondemand","m5.xlarge", "ca-central-1", "linux_WEB"))
  // })
  ],"EC2 with invalid settings": [
        t.willThrow(function() {
            EC2(undefined, undefined)
        }, "Missing required settings range"),
        t.willThrow(function() {
            EC2([], "m5.xlarge")
        }, "Missing required settings range"),
        t.willThrow(function() {
            EC2([["region"]], "m5.xlarge")
        }, "Missing required settings range"),
        t.willThrow(function() {
            EC2([["region", ""]], "m5.xlarge")
        }, "Missing region"),
        t.willThrow(function() {
            EC2([["region", undefined]], "m5.xlarge")
        }, "Missing region"),
  // })
  ],"EC2 with valid settings": [
        t.areEqual(0.192, () => EC2([
          ["region", "us-east-1"],
          ["purchase_term", "ondemand"],
          ["operating_system", "linux"]
      ], "m5.xlarge")),
          // test override
        t.areEqual(0.214, () => EC2([
          ["region", "us-east-1"],
          ["purchase_term", "ondemand"],
          ["operating_system", "linux"]
      ], "m5.xlarge", "ca-central-1")),
        t.areEqual(0.214,
              () => EC2(paramsToSettings("ca-central-1", "linux", "ondemand", "standard", 1, "all_upfront"), "m5.xlarge")),
      // })
  ],"EC2 RI": [
        t.areClose(0.115648, () => EC2(linuxRi('us-east-1', 'standard', 1, 'partial_upfront'), "m5.xlarge"), 0.00001),
        t.areClose(0.134123, () => EC2(linuxRi('us-east-1', 'convertible', 1, 'partial_upfront'), "m5.xlarge"), 0.00001),
        t.areClose(0.121, () => EC2(linuxRi('us-east-1', 'standard', 1, 'no_upfront'), "m5.xlarge"), 0.00001),
        t.areClose(0.1129, () => EC2(linuxRi('us-east-1', 'standard', 1, 'all_upfront'), "m5.xlarge"), 0.00001),
        t.areClose(0.072184, () => EC2(linuxRi('us-east-1', 'standard', 3, 'all_upfront'), "m5.xlarge"), 0.00001),
        t.areClose(0.084209, () => EC2(linuxRi('us-west-1', 'standard', 3, 'all_upfront'), "m5.xlarge"), 0.00001),
  // })
  ],"EC2 RI functions": [
        t.areClose(0.131621, () => EC2_LINUX_CONV_RI_ALL("m5.xlarge", "us-east-1", "1"), 0.00001),
        t.areClose(0.191667, () => EC2_RHEL_CONV_RI_ALL("m5.xlarge", "us-east-1", "1"), 0.00001),
        t.areClose(0.199201, () => EC2_LINUX_MSSQL_CONV_RI_ALL("m5.xlarge", "us-east-1", "web", "1"), 0.00001),
        t.areClose(0.740395, () => EC2_WINDOWS_MSSQL_STD_RI_PARTIAL("m5.xlarge", "us-east-2", "std", "3"), 0.00001),

        t.areClose(0.131621, () => AWS_EC2("reserved","m5.xlarge", "us-east-1", "linux", "convertible", "1yr", "all_upfront"), 0.00001),
        t.areClose(0.191667, () => AWS_EC2("reserved","m5.xlarge", "us-east-1", "rhel", "convertible", "1yr", "all_upfront"), 0.00001),
        t.areClose(0.199201, () => AWS_EC2("reserved","m5.xlarge", "us-east-1", "linux", "convertible", "1yr", "all_upfront", "web"), 0.00001),
        t.areClose(0.199201, () => AWS_EC2("reserved","m5.xlarge", "us-east-1", "linux_web", "convertible", "1yr", "all_upfront"), 0.00001),
        t.areClose(0.740395, () => AWS_EC2("reserved","m5.xlarge", "us-east-2", "windows", "standard", "3yr", "partial_upfront", "std"), 0.00001),
        t.areClose(0.740395, () => AWS_EC2("reserved","m5.xlarge", "us-east-2", "windows_std", "standard", "3yr", "partial_upfront"), 0.00001),
  ],"helper functions": [
        t.areDeepEqual({
          "region": "us-east-1",
          "purchase_term": "ondemand",
          "operating_system": "linux"
        }, map2dArrayToObjectWithLowerCaseValues([["region", "us-east-1"], ["purchase_term", "ondemand"], ["operating_system", "linux"]]))
  ]};
  return {"EC2Test": tests};
}

function getRDSFunctionTests() {
  const t = new UnitTestingApp();
  const tests =  {"RDS func tests": [
    t.areEqual(0.58, () => RDS_AURORA_MYSQL_OD("db.r5.xlarge", "us-east-1")),
    t.areClose(0.38, () => RDS_AURORA_MYSQL_RI("db.r5.xlarge", "us-east-1", 1, "no_upfront"), 0.000001),
    // db.r5.xlarge no longer offered in partial upfront
    t.areClose(0.288806, () => RDS_AURORA_MYSQL_RI("db.r6g.xlarge", "us-east-1", 1, "partial_upfront"), 0.000001),
    t.areClose(0.316210, () => RDS_AURORA_MYSQL_RI("db.r5.xlarge", "us-east-1", 1, "all_upfront"), 0.000001),

    t.willThrow(
        () => RDS_AURORA_MYSQL_RI("db.r5.xlarge", "us-east-1", 3, "no_upfront"), "The No-Upfront payment option is not supported for 3 year RDS RIs"),
    t.areClose(0.192570, () => RDS_AURORA_MYSQL_RI("db.r6g.xlarge", "us-east-1", 3, "partial_upfront"), 0.000001),
    t.areClose(0.202207, () => RDS_AURORA_MYSQL_RI("db.r5.xlarge", "us-east-1", 3, "all_upfront"), 0.000001),

    t.areClose(0.38, () => RDS_AURORA_MYSQL_RI_NO("db.r5.xlarge", "us-east-1", 1), 0.000001),
    t.areClose(0.288806, () => RDS_AURORA_MYSQL_RI_PARTIAL("db.r6g.xlarge", "us-east-1", 1), 0.000001),
    t.areClose(0.316210, () => RDS_AURORA_MYSQL_RI_ALL("db.r5.xlarge", "us-east-1", 1), 0.000001),

    t.areEqual(1.16, () => RDS_AURORA_POSTGRESQL_OD("db.r5.2xlarge", "us-east-1")),
    t.areEqual(1.04, () => RDS_MARIADB_OD("db.r5.2xlarge", "ca-central-1")),
    t.areEqual(1.0810, () => RDS_POSTGRESQL_OD("db.r5.2XLARGE", "CA-CENTRAL-1")),
    t.areEqual(1.04, () => RDS_MYSQL_OD("db.r5.2xlarge", "ca-central-1")),

    // Verify all RI purchase types to ensure payload sizes fit in cache
    t.areClose(0.404452, () => RDS_AURORA_POSTGRESQL_RI("db.r5.2xlarge", "us-east-1", 3, "all_upfront"), 0.000001),
    t.areClose(0.348097, () => RDS_MARIADB_RI("db.r5.2xlarge", "us-east-1", 3, "all_upfront"), 0.000001),
    t.areClose(0.348097, () => RDS_MYSQL_RI("db.r5.2xlarge", "us-east-1", 3, "all_upfront"), 0.000001),
    t.areClose(0.362595, () => RDS_POSTGRESQL_RI("db.r5.2xlarge", "us-east-1", 3, "all_upfront"), 0.000001)
    ],
"AWS_RDS func tests": [
  t.areEqual(0.58, () => AWS_RDS("aurora/mysql","db.r5.xlarge", "us-east-1","ondemand")), // RDS_AURORA_MYSQL_OD("db.r5.xlarge", "us-east-1")),
  t.areEqual(0.38, () => AWS_RDS("aurora/mysql","db.r5.xlarge", "us-east-1","reserved","1yr","no_upfront")), //RDS_AURORA_MYSQL_RI("db.r5.xlarge", "us-east-1", 1, "no_upfront"), 0.000001),
  // db.r5.xlarge no longer offered in partial upfront
  t.areClose(0.288806, () => AWS_RDS("aurora/mysql","db.r6g.xlarge", "us-east-1","reserved", "1yr", "partial_upfront"), 0.000001),
  t.areClose(0.316210, () => AWS_RDS("aurora/mysql","db.r5.xlarge", "us-east-1", "reserved","1yr", "all_upfront"), 0.000001),

  t.willThrow(
      () => AWS_RDS("aurora/mysql","db.r5.xlarge", "us-east-1", "reserved", "3yr", "no_upfront"), "The No-Upfront payment option is not supported for 3 year RDS RIs"),
  t.areClose(0.192570, () => AWS_RDS("aurora/mysql","db.r6g.xlarge", "us-east-1","reserved", "3yr", "partial_upfront"), 0.000001),
  t.areClose(0.202207, () => AWS_RDS("aurora/mysql","db.r5.xlarge", "us-east-1", "reserved", "3yr", "all_upfront"), 0.000001),

  t.areClose(0.38, () => AWS_RDS("aurora/mysql", "db.r5.xlarge", "us-east-1", "reserved", "1yr", "no_upfront"), 0.000001), //RDS_AURORA_MYSQL_RI_NO(
  t.areClose(0.288806, () => AWS_RDS("aurora/mysql", "db.r6g.xlarge", "us-east-1", "reserved", "1yr", "partial_upfront"), 0.000001), // RDS_AURORA_MYSQL_RI_PARTIAL
  t.areClose(0.316210, () => AWS_RDS("aurora/mysql", "db.r5.xlarge", "us-east-1", "reserved", "1yr", "all_upfront"), 0.000001), // RDS_AURORA_MYSQL_RI_ALL

  t.areEqual(1.16, () => AWS_RDS("aurora/postgresql","db.r5.2xlarge", "us-east-1","ondemand")), // RDS_AURORA_POSTGRESQL_OD
  t.areEqual(1.04, () => AWS_RDS("mariadb", "db.r5.2xlarge", "ca-central-1", "ondemand")), // RDS_MARIADB_OD
  t.areEqual(1.0810, () => AWS_RDS("postgresql","db.r5.2XLARGE", "CA-CENTRAL-1", "ondemand")), // RDS_POSTGRESQL_OD
  t.areEqual(1.04, () => AWS_RDS("mysql","db.r5.2xlarge", "ca-central-1", "ondemand")), // RDS_MYSQL_OD

  // Verify all RI purchase types to ensure payload sizes fit in cache
  t.areClose(0.404452, () => AWS_RDS("aurora/postgresql", "db.r5.2xlarge", "us-east-1", "reserved", "3yr", "all_upfront"), 0.000001), //RDS_AURORA_POSTGRESQL_RI
  t.areClose(0.348097, () => AWS_RDS("mariadb", "db.r5.2xlarge", "us-east-1", "reserved", "3yr", "all_upfront"), 0.000001), // RDS_MARIADB_RI
  t.areClose(0.348097, () => AWS_RDS("mysql", "db.r5.2xlarge", "us-east-1", "reserved", "3yr", "all_upfront"), 0.000001), // RDS_MYSQL_RI
  t.areClose(0.362595, () => AWS_RDS("postgresql", "db.r5.2xlarge", "us-east-1", "reserved", "3yr", "all_upfront"), 0.000001) // RDS_POSTGRESQL_RI
,
],"RDS settings tests": [
    t.areEqual(0.58, () => RDS_AURORA_MYSQL([
      ['region', 'us-east-2'],
      ['purchase_type', 'ondemand']
  ], "db.r5.xlarge")),
    t.areEqual(0.64, () => RDS_AURORA_MYSQL([
      ['region', 'us-east-2'],
      ['purchase_type', 'ondemand']
  ], "db.r5.xlarge", "ca-central-1")),

    t.areClose(0.288806, () => RDS_AURORA_MYSQL([['region', 'us-east-1'],
    ['purchase_type', 'reserved'],
    ['purchase_term', '1'],
    ['payment_option', 'partial_upfront']], "db.r6g.xlarge"), 0.000001),
    t.areClose(0.282990, () => RDS_AURORA_MYSQL([['region', 'us-east-1'],
    ['purchase_type', 'reserved'],
    ['purchase_term', '1'],
    ['payment_option', 'all_upfront']], "db.r6g.xlarge"), 0.000001)
,
],"RDS invalid settings": [

    t.willThrow(
        () => RDS_AURORA_MYSQL([
        ['region', 'us-east-1'],
        ['purchase_type', 'reserved'],
        ['purchase_term', '1'],
        ['payment_option', 'partial_upfront']
    ], "db.r1.2xlarge"), "Unable to find the price. Make sure you have the correct region, database engine and purchase type."),

    t.willThrow(
        () => RDS_AURORA_MYSQL([
        ['region', 'us-east-1'],
        ['purchase_type', 'reserved'],
        ['purchase_term', '1'],
        ['payment_option', 'partial_upfront']
    ], undefined), "Must specify a DB instance type"),

    t.willThrow(() => RDS_AURORA_MYSQL_RI("db.r5.xlarge", "us-east-1", 2, "no_upfront"), "Only 1yr and 3yr purchase terms are supported for RDS RIs"),
    t.willThrow(() => AWS_RDS("aurora/mysql","db.r5.xlarge", "us-east-1", "reserved","2yr", "no_upfront"), "Only 1yr and 3yr purchase terms are supported for RDS RIs"),
  ]
  }
  return {"RDSFunctionTest": tests};
}

function getRDSStorageTests() {
  const t = new UnitTestingApp();
  const tests = {"volume type tests": [
      t.areClose(4000 * (0.11/730), () => RDS_STORAGE_GB("aurora", 4000, "us-west-1"), 0.000001),
      t.areClose(4000 * (0.138/730), () => RDS_STORAGE_GB("gp2", 4000, "us-west-1"), 0.000001),
      t.areClose(4000 * (0.138/730), () => RDS_STORAGE_GB("piops", 4000, "us-west-1"), 0.000001),
      t.areClose(4000 * (0.11/730), () => RDS_STORAGE_GB("magnetic", 4000, "us-west-1"), 0.000001),

      t.areClose(4000 * (0.11/730), () => AWS_RDS_STORAGE("aurora", 4000, "us-west-1"), 0.000001),
      t.areClose(4000 * (0.138/730), () => AWS_RDS_STORAGE("gp2", 4000, "us-west-1"), 0.000001),
      t.areClose(4000 * (0.138/730), () => AWS_RDS_STORAGE("piops", 4000, "us-west-1"), 0.000001),
      t.areClose(4000 * (0.11/730), () => AWS_RDS_STORAGE("magnetic", 4000, "us-west-1"), 0.000001)

  ],"alias tests": [
      t.areClose(4000 * (0.11/730), () => RDS_STORAGE_AURORA_GB(4000, "us-west-1"), 0.000001),
      t.areClose(4000 * (0.138/730), () => RDS_STORAGE_GP2_GB(4000, "us-west-1"), 0.000001),
      t.areClose(4000 * (0.138/730), () => RDS_STORAGE_PIOPS_GB(4000, "us-west-1"), 0.000001),
      t.areClose(4000 * (0.11/730), () => RDS_STORAGE_MAGNETIC_GB(4000, "us-west-1"), 0.000001),

  ],"settings tests": [
      t.areClose(4000 * (0.127/730), () => RDS_STORAGE_GB(['region', 'ca-central-1'], "gp2", 4000), 0.000001),
      t.areClose(4000 * (0.138/730), () => RDS_STORAGE_GB(['region', 'ca-central-1'], "gp2", 4000, "us-west-1"), 0.000001)
  ],"invalid configs": [
      t.willThrow(() =>
          RDS_STORAGE_GB(['region', 'us-east-1'], "gp3", 400),
          "Invalid storage type"),

      t.willThrow(() =>
          RDS_STORAGE_GP2_GB(4000, undefined),
          "Missing region"),

      t.willThrow(() =>
      AWS_RDS_STORAGE("gp2",4000, undefined),
      "Missing region"),

      t.willThrow(() =>
          RDS_STORAGE_GP2_GB(undefined, "us-east-1"),
          "must specify a parameter"),

      t.willThrow(() =>
          AWS_RDS_STORAGE("gp2",undefined, "us-east-1"),
          "Must specify storage size"),

      t.willThrow(() =>
          RDS_STORAGE_GP2_GB("foo", "us-east-1"),
          "Invalid storage size"),

      // XXX: this is a compile error but we want to verify we don't treat the number as string
      // without checking
      t.willThrow(() =>
          RDS_STORAGE_GB(['region', 'us-east-1'], 400, "gp2"),
          "invalid storage type")
      ]}
  return { "RDSStorageTest": tests};
}

function getFunctionTests() {
  const t = new UnitTestingApp();
  const tests = {"Function tests": [
    t.areDeepEqual({"a":["a","b",{"c":"cccee","d":["d","ee"]}]}, () => getObjectWithValuesToLowerCase(
      { a: 
        [
          'A', 
          'b', 
          { c: 'CCCee', 
            d: ['D', 'EE'] }
        ] 
    })),
  ]}
  return {"FunctionTest": tests};
}

function linuxRi(region, offeringClass, term, paymentOption) {
  return paramsToSettings(region, 'linux', 'reserved', offeringClass, term, paymentOption)
}

function paramsToSettings(region, platform, purchaseType, offeringClass, term, paymentOption) {
  return [
    ['region', region],
    ['platform', platform],
    ['purchase_type', purchaseType],
    ['offering_class', offeringClass],
    ['purchase_term', term.toString()],
    ['payment_option', paymentOption]
  ]
}

function showTest(tests, callback) {
  const ui = SpreadsheetApp.getUi();
  const template = HtmlService.createTemplateFromFile('src/test/TestSuite.html');
  template.tests = tests;
  template.callback = callback;
  ui.showSidebar(template.evaluate());
}

function getWhitelistedFormulas() {
  return ['EC2_EBS_IO2_GB',
  'EC2_EBS_IO1_GB',
  'EC2_EBS_SC1_GB',
  'EC2_EBS_ST1_GB',
  'EC2_EBS_GP3_GB',
  'EC2_EBS_GP2_GB',
  'EC2_EBS_MAGNETIC_GB',
  'EC2_WINDOWS_MSSQL_STD_RI_ALL',
  'EC2_WINDOWS_MSSQL_STD_RI_PARTIAL',
  'EC2_WINDOWS_MSSQL_STD_RI_NO',
  'EC2_WINDOWS_MSSQL_CONV_RI_ALL',
  'EC2_WINDOWS_MSSQL_CONV_RI_PARTIAL',
  'EC2_WINDOWS_MSSQL_CONV_RI_NO',
  'EC2_LINUX_MSSQL_STD_RI_ALL',
  'EC2_LINUX_MSSQL_STD_RI_PARTIAL',
  'EC2_LINUX_MSSQL_STD_RI_NO',
  'EC2_LINUX_MSSQL_CONV_RI_ALL',
  'EC2_LINUX_MSSQL_CONV_RI_PARTIAL',
  'EC2_LINUX_MSSQL_CONV_RI_NO',
  'EC2_WINDOWS_STD_RI_ALL',
  'EC2_WINDOWS_STD_RI_PARTIAL',
  'EC2_WINDOWS_STD_RI_NO',
  'EC2_WINDOWS_CONV_RI_ALL',
  'EC2_WINDOWS_CONV_RI_PARTIAL',
  'EC2_WINDOWS_CONV_RI_NO',
  'EC2_SUSE_STD_RI_ALL',
  'EC2_SUSE_STD_RI_PARTIAL',
  'EC2_SUSE_STD_RI_NO',
  'EC2_SUSE_CONV_RI_ALL',
  'EC2_SUSE_CONV_RI_PARTIAL',
  'EC2_SUSE_CONV_RI_NO',
  'EC2_RHEL_STD_RI_ALL',
  'EC2_RHEL_STD_RI_PARTIAL',
  'EC2_RHEL_STD_RI_NO',
  'EC2_RHEL_CONV_RI_ALL',
  'EC2_RHEL_CONV_RI_PARTIAL',
  'EC2_RHEL_CONV_RI_NO',
  'EC2_LINUX_STD_RI_ALL',
  'EC2_LINUX_STD_RI_PARTIAL',
  'EC2_LINUX_STD_RI_NO',
  'EC2_LINUX_CONV_RI_ALL',
  'EC2_LINUX_CONV_RI_PARTIAL',
  'EC2_LINUX_CONV_RI_NO',
  'RDS_MARIADB_RI_ALL',
  'RDS_MARIADB_RI_PARTIAL',
  'RDS_MARIADB_RI_NO',
  'RDS_MARIADB_RI',
  'RDS_MARIADB_OD',
  'RDS_MARIADB',
  'RDS_POSTGRESQL_RI_ALL',
  'RDS_POSTGRESQL_RI_PARTIAL',
  'RDS_POSTGRESQL_RI_NO',
  'RDS_POSTGRESQL_RI',
  'RDS_POSTGRESQL_OD',
  'RDS_POSTGRESQL',
  'RDS_MYSQL_RI_ALL',
  'RDS_MYSQL_RI_PARTIAL',
  'RDS_MYSQL_RI_NO',
  'RDS_MYSQL_RI',
  'RDS_MYSQL_OD',
  'RDS_MYSQL',
  'RDS_AURORA_POSTGRESQL_RI_ALL',
  'RDS_AURORA_POSTGRESQL_RI_PARTIAL',
  'RDS_AURORA_POSTGRESQL_RI_NO',
  'RDS_AURORA_POSTGRESQL_RI',
  'RDS_AURORA_POSTGRESQL_OD',
  'RDS_AURORA_POSTGRESQL',
  'RDS_AURORA_MYSQL_RI_ALL',
  'RDS_AURORA_MYSQL_RI_PARTIAL',
  'RDS_AURORA_MYSQL_RI_NO',
  'RDS_AURORA_MYSQL_RI',
  'RDS_AURORA_MYSQL_OD',
  'RDS_AURORA_MYSQL',
  'RDS_STORAGE_MAGNETIC_GB',
  'RDS_STORAGE_PIOPS_GB',
  'RDS_STORAGE_GP2_GB',
  'RDS_STORAGE_AURORA_GB',
  'EC2_EBS_GP3_IOPS',
  'EC2_EBS_IO2_IOPS',
  'EC2_EBS_IO1_IOPS',
  'EC2_EBS_SNAPSHOT_GB',
  'EC2_EBS_GB',
  'EC2_RI',
  'EC2_OD',
  'EC2',
  'EC2_WINDOWS_OD',
  'EC2_SUSE_OD',
  'EC2_RHEL_OD',
  'EC2_WINDOWS_MSSQL_OD',
  'EC2_LINUX_MSSQL_OD',
  'EC2_LINUX_OD',
  'RDS_STORAGE_FROM_SETTINGS',
  'RDS_STORAGE_GB',
  'RDS_FROM_SETTINGS',
  'AWS_RDS_STORAGE',
  'AWS_RDS',
  'AWS_EBS',
  'AWS_EC2',
  'AWS_REDSHIFT']
}