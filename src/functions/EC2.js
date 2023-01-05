
/**
 * Returns the on-demand pricing for given instance type.
 *
 * @param {"m5.xlarge"} instanceType Instance type, eg. "m5.xlarge"
 * @param {"us-east-2"} region
 * @param {"linux"} platform
 * @returns price
 * @customfunction
 */
function EC2_OD(instanceType, region, platform) {
    return fetchApi({instanceType, region, purchaseType: "ondemand", platform});
  }
  
  /**
  * Returns the reserved instance pricing for the given instance type and purchase options.
  * 
  * @param {"m5.xlarge"} instanceType Instance type, eg. "m5.xlarge"
  * @param {"us-east-2"} region
  * @param {"linux"} platform Instance platform, eg. "linux", "windows", etc.
  * @param {"convertible"} offeringClass Either "standard" or "convertible"
  * @param {1} purchaseTerm Duration of RI in years (1 or 3)
  * @param {"all_upfront"} paymentOption Payment terms (no_upfront, partial_upfront, all_upfront)
  * @returns price
  * @customfunction
  */
  function EC2_RI(instanceType, region, platform, offeringClass,
    purchaseTerm, paymentOption) {
    return fetchApi({instanceType, region, purchaseType: "reserved-instance", platform, offeringClass, purchaseTerm, paymentOption})
  }