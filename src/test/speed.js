function speedComparisonWithOrWithoutAnalytics() {
  const cache = new CacheLoader(CacheService.getScriptCache());
  const urlCDNPath = 'https://cdn.x.macroscope.io/aws-pricing/retro/pricing/1.0/rds/region/us-east-1/aurora/mysql/reserved-instance/single-az/index.json';
  
  cache.remove(urlCDNPath);
  cfg.logCustomFunctionToAnalytics = true;
  console.time('WITH_ANALYTICS')
  // console.log(AWS_RDS("aurora/mysql", "db.r6g.xlarge", "us-east-1", "reserved", "3yr", "partial_upfront"))
  console.timeEnd('WITH_ANALYTICS')
  
  cache.remove(urlCDNPath);
  cfg.logCustomFunctionToAnalytics = false;
  console.time('WITHOUT_ANALYTICS')
  // console.log(AWS_RDS("aurora/mysql", "db.r6g.xlarge", "us-east-1", "reserved", "3yr", "partial_upfront"))
  console.timeEnd('WITHOUT_ANALYTICS')
}