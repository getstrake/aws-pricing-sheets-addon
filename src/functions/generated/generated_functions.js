 /**
 * Returns the hourly cost for the amount of provisioned EBS MAGNETIC storage Gigabytes. Invoke as either:
 * (settingsRange, size[, region]) or (size, region).
 *
 * @param {A2:B7 or 4000} settingsOrSize Settings range or volume size
 * @param {4000 or "us-east-2"} sizeOrRegion Either a volume size or the region
 * @param {"us-east-2"} region AWS region (optional)
 * @returns price
 * @customfunction
 */
function EC2_EBS_MAGNETIC_GB(size, region) {
    return EC2_EBS_GB("magnetic", size, region)
}

 /**
 * Returns the hourly cost for the amount of provisioned EBS GP2 storage Gigabytes. Invoke as either:
 * (settingsRange, size[, region]) or (size, region).
 *
 * @param {A2:B7 or 4000} settingsOrSize Settings range or volume size
 * @param {4000 or "us-east-2"} sizeOrRegion Either a volume size or the region
 * @param {"us-east-2"} region AWS region (optional)
 * @returns price
 * @customfunction
 */
function EC2_EBS_GP2_GB(size, region) {
      return EC2_EBS_GB("gp2", size, region);
}


//  /**
//  * Returns the hourly cost for the amount of provisioned EBS GP3 storage Gigabytes. Invoke as either:
//  * (settingsRange, size[, region]) or (size, region).
//  *
//  * @param {A2:B7 or 4000} settingsOrSize Settings range or volume size
//  * @param {4000 or "us-east-2"} sizeOrRegion Either a volume size or the region
//  * @param {"us-east-2"} region AWS region (optional)
//  * @returns price
//  * @customfunction
//  */
// function EC2_EBS_GP3_GB(settingsOrSize, sizeOrRegion, region?) {
//     if (typeof settingsOrSize === "string" || typeof settingsOrSize === "number") {
//         return EC2_EBS_GB("gp3", settingsOrSize.toString(), sizeOrRegion)
//     } else {
//         return EC2_EBS_GB(settingsOrSize, "gp3", sizeOrRegion, region)
//     }
// }
//  /**
//  * Returns the hourly cost for the amount of provisioned EBS ST1 storage Gigabytes. Invoke as either:
//  * (settingsRange, size[, region]) or (size, region).
//  *
//  * @param {A2:B7 or 4000} settingsOrSize Settings range or volume size
//  * @param {4000 or "us-east-2"} sizeOrRegion Either a volume size or the region
//  * @param {"us-east-2"} region AWS region (optional)
//  * @returns price
//  * @customfunction
//  */
// function EC2_EBS_ST1_GB(settingsOrSize, sizeOrRegion, region?) {
//     if (typeof settingsOrSize === "string" || typeof settingsOrSize === "number") {
//         return EC2_EBS_GB("st1", settingsOrSize.toString(), sizeOrRegion)
//     } else {
//         return EC2_EBS_GB(settingsOrSize, "st1", sizeOrRegion, region)
//     }
// }

//  /**
//  * Returns the hourly cost for the amount of provisioned EBS SC1 storage Gigabytes. Invoke as either:
//  * (settingsRange, size[, region]) or (size, region).
//  *
//  * @param {A2:B7 or 4000} settingsOrSize Settings range or volume size
//  * @param {4000 or "us-east-2"} sizeOrRegion Either a volume size or the region
//  * @param {"us-east-2"} region AWS region (optional)
//  * @returns price
//  * @customfunction
//  */
// function EC2_EBS_SC1_GB(settingsOrSize, sizeOrRegion, region?) {
//     if (typeof settingsOrSize === "string" || typeof settingsOrSize === "number") {
//         return EC2_EBS_GB("sc1", settingsOrSize.toString(), sizeOrRegion)
//     } else {
//         return EC2_EBS_GB(settingsOrSize, "sc1", sizeOrRegion, region)
//     }
// }


 /**
 * Returns the hourly cost for the amount of provisioned EBS IO1 storage Gigabytes. Invoke as either:
 * (settingsRange, size[, region]) or (size, region).
 *
 * @param {A2:B7 or 4000} settingsOrSize Settings range or volume size
 * @param {4000 or "us-east-2"} sizeOrRegion Either a volume size or the region
 * @param {"us-east-2"} region AWS region (optional)
 * @returns price
 * @customfunction
 */
function EC2_EBS_IO1_GB(size, region) {
  return EC2_EBS_GB("io1", size, region);
}


//  /**
//  * Returns the hourly cost for the amount of provisioned EBS IO2 storage Gigabytes. Invoke as either:
//  * (settingsRange, size[, region]) or (size, region).
//  *
//  * @param {A2:B7 or 4000} settingsOrSize Settings range or volume size
//  * @param {4000 or "us-east-2"} sizeOrRegion Either a volume size or the region
//  * @param {"us-east-2"} region AWS region (optional)
//  * @returns price
//  * @customfunction
//  */
// function EC2_EBS_IO2_GB(settingsOrSize, sizeOrRegion, region?) {
//     if (typeof settingsOrSize === "string" || typeof settingsOrSize === "number") {
//         return EC2_EBS_GB("io2", settingsOrSize.toString(), sizeOrRegion)
//     } else {
//         return EC2_EBS_GB(settingsOrSize, "io2", sizeOrRegion, region)
//     }
// }