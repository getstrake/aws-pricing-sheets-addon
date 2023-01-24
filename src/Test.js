function test2() {
  cfg.testing = true;
  emptyCache();

  // console.log(EC2_EBS_MAGNETIC_GB(550.0, "us-east-1"));
  // console.log(EC2_EBS_GP2_GB("400", "us-east-1"));
  // console.log(EC2_EBS_GP3_GB("400", "us-east-2"));
  // console.log(EC2_EBS_GP3_IOPS(7000, "us-east-1", 0.000001) );
  // console.log(EC2_EBS_IO1_IOPS(15000, "us-east-1"));
  // console.log(EC2_EBS_IO2_IOPS(15000, "us-east-1"));
  // console.log(EC2_EBS_MAGNETIC_GB(550, "us-east-1"));
  // console.log(EC2_EBS_GB([['region', 'us-east-1']], "gp2", 400));
  // console.log(EC2_EBS_MAGNETIC_GB(550.0, "us-east-1"));
  // console.log(EC2_EBS_IO2_IOPS(60000, "us-east-1"));
  // console.log(EC2_EBS_GP3_IOPS(7000, "us-east-1", 0.000001));

  console.log(RDS_AURORA_MYSQL_OD("db.r5.xlarge", "us-east-1"));
}

function test1() {
  console.log(mapValuesToObjectWithLowerCaseValues([["region", "us-east-1"], ["purchase_term", "ondemand"], ["operating_system", "linux"]]));
}

function fetchTest() {
  const baseHost = 'https://cdn.x.macroscope.io/aws-pricing/retro';
  const path = '/pricing/1.0/rds/database-storage/index.json?timestamp=1673883284511'
  const url = '/pricing/1.0/rds/region/us-east-1/aurora/mysql/reserved-instance/single-az/index.json'; //`${baseHost}${path}`;
  console.log('fetching ' + url)
  var response = UrlFetchApp.fetch(url);
  saveToDrive(response.getContentText(), 'RDS RI from cdn ');
}

function saveToDrive(text, title) {
    var file = DriveApp.createFile((title || "") + " - " + new Date().getTime() + ".txt", JSON.stringify(text, null, 2));
    file.moveTo(DriveApp.getFolderById('1thOpxg2Z7DmH-k63ts5ZiUfjch2IrS4B'));
}

function emptyCache() {
  let url = 'https://cdn.x.macroscope.io/aws-pricing/retro/pricing/1.0/rds/region/ca-central-1/mariadb/ondemand/single-az/index.json';
  cache.remove(url);
}