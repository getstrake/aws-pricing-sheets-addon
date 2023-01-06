// EC2_OD("m5.xlarge", "us-east-1", "linux")
function test() {
    console.log(EC2_OD("m5.metal", "us-east-2", "windows"));
    console.log(RDS_STORAGE_GB("aurora", 4000, "us-west-1"));
}