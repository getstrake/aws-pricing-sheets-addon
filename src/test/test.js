function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Test')
    .addItem('Parallel testing','showTest')
    .addToUi();
}

function getEBSTests() {
  const t = new UnitTestingApp();
  let s = [ // testing range
      ['region', 'us-east-1']
  ];
  return [
    t.areClose(3.14, 3.141, 0.01, '3.14 ~= 3.141'),
    t.areClose(300.0 * (0.10/730.0), () => EC2_EBS_GP2_GB("400", "us-east-1"), 0.000001),
    t.areClose(400.0 * (0.10/730.0), () => EC2_EBS_GP2_GB("400", "us-east-1"), 0.000001),
    t.areClose(400.0 * (0.10/730.0), () => EC2_EBS_GP2_GB("400", "us-east-2"), 0.000001),
    t.areClose(400.0 * (0.08/730.0), () => EC2_EBS_GP3_GB("400", "us-east-1"), 0.000001),
    t.areClose(400.0 * (0.08/730.0), () => EC2_EBS_GP3_GB("400", "us-east-2"), 0.000001),
    t.areClose(15000 * (0.065/730.0), () => EC2_EBS_IO1_IOPS(15000, "us-east-1"), 0.000001),
    t.areClose(20000 * (0.072/730.0), () => EC2_EBS_IO1_IOPS(20000, "ca-central-1"), 0.000001),
    t.areClose(15000 * (0.065/730.0), () => EC2_EBS_IO2_IOPS(15000, "us-east-1"), 0.000001),
    t.areClose(20000 * (0.072/730.0), () => EC2_EBS_IO2_IOPS(20000, "ca-central-1"), 0.000001),
    t.areClose(32000 * (0.065/730.0) + (60000-32000) * (0.0455/730.0),
     () => EC2_EBS_IO2_IOPS(60000, "us-east-1"), 0.000001),
    t.areClose(32000 * (0.065/730.0) + 32000 * (0.0455/730.0) + (70000-64000) * (0.03185/730.0),
    () => EC2_EBS_IO2_IOPS(70000, "us-east-1"), 0.000001),
    t.areClose(0.0, () => EC2_EBS_GP3_IOPS(2800, "us-east-1"), 0.000001),
    t.areClose((7000 - 3000) * (0.005/730.0), () => EC2_EBS_GP3_IOPS(7000, "us-east-1"), 0.000001),
    t.areClose(2500 * (0.05/730.0), () => EC2_EBS_SNAPSHOT_GB(2500, "us-east-1"), 0.000001),
    t.areClose(5500 * (0.055/730.0), () => EC2_EBS_SNAPSHOT_GB(5500, "ca-central-1"), 0.000001),
    t.areClose(550.0 * (0.05/730.0), () => EC2_EBS_MAGNETIC_GB(550.0, "us-east-1"), 0.000001),
    t.areClose(550.0 * (0.125/730.0), () => EC2_EBS_IO1_GB(550.0, "us-east-1"), 0.000001),
    t.areClose(550.0 * (0.125/730.0), () => EC2_EBS_IO2_GB(550.0, "us-east-1"), 0.000001),
    t.areClose(550.0 * (0.045/730.0), () => EC2_EBS_ST1_GB(550.0, "us-east-1"), 0.000001),
    t.areClose(550.0 * (0.015/730.0), () => EC2_EBS_SC1_GB(550.0, "us-east-1"), 0.000001),
    t.areClose(400.0 * (0.10/730.0), () => EC2_EBS_GP2_GB(s, "400"), 0.000001),
    t.areClose(400.0 * (0.10/730.0), () => EC2_EBS_GP2_GB(s, 400), 0.000001),
    t.areClose(400.0 * (0.11/730.0), () => EC2_EBS_GP2_GB(s, 400, "ca-central-1"), 0.000001),
    t.areClose(400.0 * (0.11/730.0), () => EC2_EBS_GP2_GB(s, 400, "CA-CENTRAL-1"), 0.000001),
    t.areClose(400.0 * (0.10/730.0), () => EC2_EBS_GB(s, "gp2", 400), 0.000001),
    t.areClose(400.0 * (0.10/730.0), () => EC2_EBS_GB(s, "GP2", 400), 0.000001),
    t.areClose(400.0 * (0.125/730.0), () => EC2_EBS_GB(s, "io1", 400), 0.000001),
    t.areClose(10000 * (0.065/730.0), () => EC2_EBS_IO1_IOPS(s, 10000), 0.000001),
    t.areClose(10000 * (0.072/730.0), () => EC2_EBS_IO1_IOPS(s, 10000, "ca-central-1"), 0.000001),
    t.areClose(10000 * (0.065/730.0), () => EC2_EBS_IO2_IOPS(s, 10000), 0.000001),
    t.areClose(10000 * (0.072/730.0), () => EC2_EBS_IO2_IOPS(s, 10000, "ca-central-1"), 0.000001),
    t.areClose(4000 * (0.05/730.0), () => EC2_EBS_SNAPSHOT_GB(s, 4000), 0.000001),
    t.areClose(4000 * (0.055/730.0), () => EC2_EBS_SNAPSHOT_GB(s, 4000, "ca-central-1"), 0.000001),
    t.willThrow(function() {
        EC2_EBS_GB(s, "gp1", 400)
    }, "invalid EBS volume type"),
    t.willThrow(function() {
        EC2_EBS_GP2_GB(400, undefined)
    }, "must specify region"),
    t.willThrow(function() {
        EC2_EBS_GP2_GB(undefined, "us-east-1")
    }, "must specify parameter"),
    t.willThrow(function() {
        EC2_EBS_GP2_GB("foo", "us-east-1")
    }, "unable to parse volume units"),
    t.willThrow(function() {
        EC2_EBS_GB(s, 400, "gp2")
    }, "invalid EBS volume type")
  ];
}

function getECTests() {
  const t = new UnitTestingApp();
  let settings = [
    ["region", "us-east-1"],
    ["purchase_term", "ondemand"],
    ["operating_system", "linux"]
  ];
  return [
    t.areEqual(0.192, () => EC2_OD("m5.xlarge", "us-east-1", "linux")),
    t.areEqual(0.214, () => EC2_OD("m5.xlarge", "ca-central-1", "linux")),
    t.areEqual(0.192, () => EC2_LINUX_OD("m5.xlarge", "us-east-1")),
    t.areEqual(0.214, () => EC2_LINUX_OD("m5.xlarge", "ca-central-1")),
    t.areEqual(0.252, () => EC2_RHEL_OD("m5.xlarge", "us-east-1")),
    t.areEqual(0.292, () => EC2_SUSE_OD("m5.xlarge", "us-east-1")),
    t.willThrow(function() {
        EC2_OD("m5.xlarge", "us-east-1", undefined)
    }, "Missing platform"),
    t.willThrow(function() {
        EC2_LINUX_OD("mX5.xlarge", "us-east-1")
    }, "Can not find instance"),
    t.areEqual(0.376, () => EC2_WINDOWS_OD("m5.xlarge", "us-east-1")),
    t.areEqual(0.398, () => EC2_WINDOWS_OD("m5.xlarge", "ca-central-1")),
  //t.describe("EC2 previous generation", function() {
    t.areEqual(0.35, () => EC2_LINUX_OD("m1.xlarge", "us-east-1")),
    t.areEqual(6.82, () => EC2_LINUX_OD("i2.8xlarge", "us-east-1")),
  //t.describe("EC2 case sensitivity", function() {
    t.areEqual(0.192, () => EC2_LINUX_OD("M5.XLARGE", "US-EAST-1")),
  // })
  //t.describe("EC2 MSSQL", function() {
    t.areEqual(0.282, () => EC2_LINUX_MSSQL_OD("m5.xlarge", "ca-central-1", "web")),
    t.areEqual(0.694, () => EC2_LINUX_MSSQL_OD("m5.xlarge", "ca-central-1", "std")),
    t.areEqual(1.714, () => EC2_LINUX_MSSQL_OD("m5.xlarge", "ca-central-1", "enterprise")),
    t.areEqual(0.466, () => EC2_WINDOWS_MSSQL_OD("m5.xlarge", "ca-central-1", "web")),
    t.areEqual(0.282, () => EC2_LINUX_MSSQL_OD("m5.xlarge", "ca-central-1", "WEB")),
    t.willThrow(function() {
        EC2_LINUX_MSSQL_OD("m5.xlarge", "ca-central-1", undefined)
    }, "Missing SQL License"),
  // })
  //t.describe("EC2 with invalid settings", function() {
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
  //t.describe("EC2 with valid settings", () => {
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
  //t.describe("EC2 RI", () => {
    t.areClose(0.115648, () => EC2(linuxRi('us-east-1', 'standard', 1, 'partial_upfront'), "m5.xlarge"), 0.00001),
    t.areClose(0.134123, () => EC2(linuxRi('us-east-1', 'convertible', 1, 'partial_upfront'), "m5.xlarge"), 0.00001),
    t.areClose(0.121, () => EC2(linuxRi('us-east-1', 'standard', 1, 'no_upfront'), "m5.xlarge"), 0.00001),
    t.areClose(0.1129, () => EC2(linuxRi('us-east-1', 'standard', 1, 'all_upfront'), "m5.xlarge"), 0.00001),
    t.areClose(0.072184, () => EC2(linuxRi('us-east-1', 'standard', 3, 'all_upfront'), "m5.xlarge"), 0.00001),
    t.areClose(0.084209, () => EC2(linuxRi('us-west-1', 'standard', 3, 'all_upfront'), "m5.xlarge"), 0.00001),
  // })
  //t.describe("EC2 RI functions", () => {
    t.areClose(0.131621, () => EC2_LINUX_CONV_RI_ALL("m5.xlarge", "us-east-1", "1"), 0.00001),
    t.areClose(0.191667, () => EC2_RHEL_CONV_RI_ALL("m5.xlarge", "us-east-1", "1"), 0.00001),
    t.areClose(0.199201, () => EC2_LINUX_MSSQL_CONV_RI_ALL("m5.xlarge", "us-east-1", "web", "1"), 0.00001),
    t.areClose(0.740395, () => EC2_WINDOWS_MSSQL_STD_RI_PARTIAL("m5.xlarge", "us-east-2", "std", "3"), 0.00001),
  // helper functions
    t.areDeepEqual({
      "region": "us-east-1",
      "purchase_term": "ondemand",
      "operating_system": "linux"
    }, mapValuesToObjectWithLowerCaseValues([["region", "us-east-1"], ["purchase_term", "ondemand"], ["operating_system", "linux"]]))
  ];
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

function showTest() {
  const ui = SpreadsheetApp.getUi();
  const template = HtmlService.createTemplateFromFile('src/test/TestSuite.html');
  template.tests = [...Array(getECTests().length).keys()];
  ui.showSidebar(template.evaluate());
}

function test(testIndex) {
  return getECTests()[testIndex];
}