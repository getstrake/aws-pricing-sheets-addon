// Generic Formula's are part of v2 of the AWS Pricing Sheets add-on

/**
 * Returns the pricing for an instance type with a standard, no-upfront purchase
 *
 * @param {"reserved"} purchaseType Either "ondemand" or "reserved"
 * @param {"m5.xlarge"} instanceType Type of EC2 instance
 * @param {"us-east-2"} region Region of EC2 instance
 * @param {"linux"} platform Platform of EC2 instance
 * @param {"standard"} offeringClass Offering class of EC2 instance (for reserved instance)
 * @param {"1yr"} purchaseTerm Reserved instance: Purchase term
 * @param {"no_upfront"} paymentOption Reserved instance: Payment option (no_upfront, partial_upfront, all_upfront)
 * @param {"std"} sqlLicense Optional: SQL license type (std, web, or enterprise)
 * @returns price
 * @customfunction
 */
function AWS_EC2(purchaseType, instanceType, region, platform, offeringClass, purchaseTerm, paymentOption, sqlLicense) {
  return analyticsWrapper(arguments, () => {
    // rewrite arguments to lowercase
    options = getObjectWithValuesToLowerCase({ instanceType, region, purchaseType, platform, offeringClass, purchaseTerm, paymentOption, sqlLicense });
    
    // validation
    if(!["ondemand","reserved"].includes(options.purchaseType))
      throw `Purchase type "${options.purchaseType}" is not supported. Please use "ondemand" or "reserved".`;

    if(options.purchaseType === "ondemand") {
      if(purchaseTerm || paymentOption)
        throw `Purchase term "${purchaseTerm}" ${paymentOption ? `and payment option "${paymentOption}" are`: "is"} only supported for reserved instances`
    }

    if(sqlLicense) {
      options.platform = options.platform + '_' + sqlLicense;
      delete options.sqlLicense;
    }
    
    // rewrite purchaseType
    options.purchaseType = options.purchaseType === "reserved" ? "reserved-instance" : "ondemand";

    return fetchApiEC2(options);
  });
}

/**
 * Returns the hourly cost for the amount of provisioned EBS storage Gigabytes. 
 * When a formula has "snapshot" as storageType, the first field will be ignored. 
 * In this example the first argument is empty: AWS_EBS("","snapshot",3000,"us-east-1")
 *
 * @param {"gp3"} volumeType Volume type of EBS volume. This field will be ignored, when storageType is "snapshot"
 * @param {"iops"} storageType Storage type of EBS volume
 * @param {4000} volumeSize Volume size in GB
 * @param {"us-east-2"} region Region of EBS volume
 * @returns price
 * @customfunction
 */
function AWS_EBS(volumeType, storageType, volumeSize, region) {
  return analyticsWrapper(arguments, () => {
    options = getObjectWithValuesToLowerCase({ volumeType, storageType, volumeSize, region });
    return fetchApiEBS(options);
  });
}

/**
 * Returns the instance price for a RDS DB instance
 * 
 * @param {"aurora/mysql"} dbEngine Database engine: aurora/mysql, aurora/postgresql, mysql, mariadb, postgresql
 * @param {"db.r6g.xlarge"} instanceType Type of RDS instance
 * @param {"us-east-1"} region Override the region setting (optional)
 * @param {"reserved"} purchaseType Either "ondemand" or "reserved"
 * @param {"3yr"} purchaseTerm Purchase term (for reserved instances)
 * @param {"partial_upfront"} paymentOption Payment option: no_upfront, partial_upfront, all_upfront (for reserved instances)
 *
 * @returns price
 * @customfunction
 */
function AWS_RDS(dbEngine, instanceType, region, purchaseType, purchaseTerm, paymentOption) {
  return analyticsWrapper(arguments, () => {
    // rewrite arguments to lowercase
    const options = getObjectWithValuesToLowerCase({ dbEngine, instanceType, region, purchaseType, purchaseTerm, paymentOption });
    
    // validation
    if(!["ondemand","reserved"].includes(options.purchaseType))
      throw `Purchase type "${options.purchaseType}" is not supported. Please use "ondemand" or "reserved".`;

    // rewrite purchaseType
    options.purchaseType = options.purchaseType === "reserved" ? "reserved-instance" : "ondemand";
    
    return fetchApiRDS(options);
  });
}

/**
 * Returns the price of RDS storage.
 *
 * @param {"gp2"} storageType Storage type: aurora, gp2, piops, magnetic
 * @param {4000} storageSize Volume size in GB
 * @param {"us-east-2"} region Region
 * @returns price
 * @customfunction
 */
function AWS_RDS_STORAGE(storageType, storageSize, region) {
  return analyticsWrapper(arguments, () => {
    const options = getObjectWithValuesToLowerCase({ storageType, storageSize, region });
    return fetchApiRDSStorage(options);
  });
}
