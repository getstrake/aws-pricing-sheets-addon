function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Test')
    .addItem('Test EC2','showTestEC2')
    .addItem('Test EBS','showTestEBS')
    .addItem('Test RDS Functions','showTestRDSFunction')
    .addItem('Test RDS Storage','showTestRDSStorageFunction')
    .addItem('Test Functions','showTestFunctions')
    .addToUi();
}

function getEBSTests() {
  const t = new UnitTestingApp();
  let s = [ // testing range
      ['region', 'us-east-1']
  ];
  return {"EBS GP2": [
    t.areClose(400.0 * (0.10/730.0), () => EC2_EBS_GP2_GB("400", "us-east-1"), 0.000001),
    t.areClose(400.0 * (0.10/730.0), () => EC2_EBS_GP2_GB("400", "us-east-2"), 0.000001)


],"EBS GP3": [
    t.areClose(400.0 * (0.08/730.0), () => EC2_EBS_GP3_GB("400", "us-east-1"), 0.000001),
    t.areClose(400.0 * (0.08/730.0), () => EC2_EBS_GP3_GB("400", "us-east-2"), 0.000001)


],"EBS IO1 IOPs": [
    t.areClose(15000 * (0.065/730.0), () => EC2_EBS_IO1_IOPS(15000, "us-east-1"), 0.000001),
    t.areClose(20000 * (0.072/730.0), () => EC2_EBS_IO1_IOPS(20000, "ca-central-1"), 0.000001)


],"EBS IO2 IOPs": [
    t.areClose(15000 * (0.065/730.0), () => EC2_EBS_IO2_IOPS(15000, "us-east-1"), 0.000001),
    t.areClose(20000 * (0.072/730.0), () => EC2_EBS_IO2_IOPS(20000, "ca-central-1"), 0.000001)


],"EBS IO2 IOPs - tiered": [
    t.areClose(32000 * (0.065/730.0) + (60000-32000) * (0.0455/730.0),
     () => EC2_EBS_IO2_IOPS(60000, "us-east-1"), 0.000001),

     t.areClose(32000 * (0.065/730.0) + 32000 * (0.0455/730.0) + (70000-64000) * (0.03185/730.0),
     () => EC2_EBS_IO2_IOPS(70000, "us-east-1"), 0.000001)


],"EBS GP3 IOPs - tiered": [
     t.areClose(0.0, () => EC2_EBS_GP3_IOPS(2800, "us-east-1"), 0.000001),

     t.areClose((7000 - 3000) * (0.005/730.0), () => EC2_EBS_GP3_IOPS(7000, "us-east-1"), 0.000001)


],"EBS Snapshots": [
    t.areClose(2500 * (0.05/730.0), () => EC2_EBS_SNAPSHOT_GB(2500, "us-east-1"), 0.000001),
    t.areClose(5500 * (0.055/730.0), () => EC2_EBS_SNAPSHOT_GB(5500, "ca-central-1"), 0.000001)


],"EBS storage tests": [
    t.areClose(550.0 * (0.05/730.0), () => EC2_EBS_MAGNETIC_GB(550.0, "us-east-1"), 0.000001),
    t.areClose(550.0 * (0.125/730.0), () => EC2_EBS_IO1_GB(550.0, "us-east-1"), 0.000001),
    t.areClose(550.0 * (0.125/730.0), () => EC2_EBS_IO2_GB(550.0, "us-east-1"), 0.000001),
    t.areClose(550.0 * (0.045/730.0), () => EC2_EBS_ST1_GB(550.0, "us-east-1"), 0.000001),
    t.areClose(550.0 * (0.015/730.0), () => EC2_EBS_SC1_GB(550.0, "us-east-1"), 0.000001)


],"EBS with settings range": [
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
    }, "must specify parameter"),

    t.willThrow(function() {
      return EC2_EBS_GP2_GB("foo", "us-east-1")
    }, "unable to parse volume units"),

    t.willThrow(function() {
      return EC2_EBS_GB(s, 400, "gp2")
    }, "invalid EBS volume type")
  ]};
}


function getEC2Tests() {
  const t = new UnitTestingApp();
  let settings = [
    ["region", "us-east-1"],
    ["purchase_term", "ondemand"],
    ["operating_system", "linux"]
  ];
  return {"EC2 on-demand": [
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
    }, "Can not find instance"),
    ], "EC2 Windows on-demand": [
    ],"EC2 Windows on-demand": [
    t.areEqual(0.376, () => EC2_WINDOWS_OD("m5.xlarge", "us-east-1")),
    t.areEqual(0.398, () => EC2_WINDOWS_OD("m5.xlarge", "ca-central-1")),
  ],"EC2 previous generation": [
    t.areEqual(0.35, () => EC2_LINUX_OD("m1.xlarge", "us-east-1")),
    t.areEqual(6.82, () => EC2_LINUX_OD("i2.8xlarge", "us-east-1")),
  ],"EC2 case sensitivity": [
    t.areEqual(0.192, () => EC2_LINUX_OD("M5.XLARGE", "US-EAST-1")),
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
  ],"helper functions": [
    t.areDeepEqual({
      "region": "us-east-1",
      "purchase_term": "ondemand",
      "operating_system": "linux"
    }, map2dArrayToObjectWithLowerCaseValues([["region", "us-east-1"], ["purchase_term", "ondemand"], ["operating_system", "linux"]]))
  ]};
}

function getRDSFunctionTests() {
  const t = new UnitTestingApp();
  return {"RDS func tests": [
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
    ], "db.r1.2xlarge"), "Unable to find RDS instance db.r1.2xlarge for DB engine aurora/mysql"),

    t.willThrow(
        () => RDS_AURORA_MYSQL([
        ['region', 'us-east-1'],
        ['purchase_type', 'reserved'],
        ['purchase_term', '1'],
        ['payment_option', 'partial_upfront']
    ], undefined), "Must specify a DB instance type"),

    t.willThrow(() => RDS_AURORA_MYSQL_RI("db.r5.xlarge", "us-east-1", 2, "no_upfront"), "Only 1yr and 3yr purchase terms are supported for RDS RIs")
    ]
  }
}

function getRDSStorageTests() {
  const t = new UnitTestingApp();
  return {"volume type tests": [
      t.areClose(4000 * (0.11/730), () => RDS_STORAGE_GB("aurora", 4000, "us-west-1"), 0.000001),
      t.areClose(4000 * (0.138/730), () => RDS_STORAGE_GB("gp2", 4000, "us-west-1"), 0.000001),
      t.areClose(4000 * (0.138/730), () => RDS_STORAGE_GB("piops", 4000, "us-west-1"), 0.000001),
      t.areClose(4000 * (0.11/730), () => RDS_STORAGE_GB("magnetic", 4000, "us-west-1"), 0.000001)
  ,

  ],"alias tests": [
      t.areClose(4000 * (0.11/730), () => RDS_STORAGE_AURORA_GB(4000, "us-west-1"), 0.000001),
      t.areClose(4000 * (0.138/730), () => RDS_STORAGE_GP2_GB(4000, "us-west-1"), 0.000001),
      t.areClose(4000 * (0.138/730), () => RDS_STORAGE_PIOPS_GB(4000, "us-west-1"), 0.000001),
      t.areClose(4000 * (0.11/730), () => RDS_STORAGE_MAGNETIC_GB(4000, "us-west-1"), 0.000001)
  ,

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
          RDS_STORAGE_GP2_GB(undefined, "us-east-1"),
          "must specify a parameter"),

      t.willThrow(() =>
          RDS_STORAGE_GP2_GB("foo", "us-east-1"),
          "Invalid storage size"),

      // XXX: this is a compile error but we want to verify we don't treat the number as string
      // without checking
      t.willThrow(() =>
          RDS_STORAGE_GB(['region', 'us-east-1'], 400, "gp2"),
          "invalid storage type")
      ]}
}

function getFunctionTests() {
  const t = new UnitTestingApp();
  return {"Function tests": [
    t.areDeepEqual({"a":["a","b",{"c":"cccee","d":["d","ee"]},"2022-12-31T23:00:00.000Z"]}, () => getObjectWithValuesToLowerCase(
      { a: 
        [
          'A', 
          'b', 
          { c: 'CCCee', 
            d: ['D', 'EE'] }, 
          new Date(2023,0,1)
        ] 
    })),
  ]}
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

function showTestEBS() {
  showTest(getEBSTests(), 'EBSTest');
}

function showTestEC2() {
  showTest(getEC2Tests(), 'EC2Test');
}

function showTestRDSFunction() {
  showTest(getRDSFunctionTests(), 'RDSFunctionTest');
}

function showTestRDSStorageFunction() {
  showTest(getRDSStorageTests(), 'RDSStorageTest');
}

function showTestFunctions() {
  showTest(getFunctionTests(), 'FunctionTest');
}

function EC2Test(chapter, testIndex) {
  return getEC2Tests()[chapter][testIndex];
}

function EBSTest(chapter, testIndex) {
  return getEBSTests()[chapter][testIndex];
}

function RDSFunctionTest(chapter, testIndex) {
  return getRDSFunctionTests()[chapter][testIndex];
}

function RDSStorageTest(chapter, testIndex) {
  return getRDSStorageTests()[chapter][testIndex];
}

function FunctionTest(chapter, testIndex) {
  return getFunctionTests()[chapter][testIndex];
}

function showTest(tests, callback) {
  const ui = SpreadsheetApp.getUi();
  const template = HtmlService.createTemplateFromFile('src/test/TestSuite.html');
  template.tests = tests;
  template.callback = callback;
  ui.showSidebar(template.evaluate());
}
