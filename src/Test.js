function test2() {
  console.log(EC2_SUSE_OD("m5.xlarge", "us-east-1"));
}

function test1() {
  console.log(mapValuesToObjectWithLowerCaseValues([["region", "us-east-1"], ["purchase_term", "ondemand"], ["operating_system", "linux"]]));
}