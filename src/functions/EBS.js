/**
 * Returns the hourly cost for the amount of provisioned EBS storage. Invoke as either:
 * (settingsRange, volumeType, volumeSize[, region]) or (volumeType, volumeSize, region).
 *
 * @param {A2:B7 or "gp2"} settingsOrType Settings range or volume type
 * @param {"gp2" or 4000} typeOrSize Volume type or volume size (in GB)
 * @param {4000 or "us-east-2"} sizeOrRegion Volume size (in GB) or region
 * @param {"us-east-2"} region AWS region (optional)
 * @returns price
 * @customfunction
 */
function EC2_EBS_GB(type, size, region) {
    //
}
