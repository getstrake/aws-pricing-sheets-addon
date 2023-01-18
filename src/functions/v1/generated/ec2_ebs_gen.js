/* DO NOT EDIT -- this file is generated */

// EBS MAGNETIC storage
function EC2_EBS_MAGNETIC_GB(settingsOrSize, sizeOrRegion, region) {
  if(typeof settingsOrSize === "string" || typeof settingsOrSize === "number")
    return EC2_EBS_GB("magnetic", settingsOrSize, sizeOrRegion);
  else
    return EC2_EBS_GB_FROM_SETTINGS("magnetic", settingsOrSize, sizeOrRegion, region);
}

// EBS GP2 storage
function EC2_EBS_GP2_GB(settingsOrSize, sizeOrRegion, region) {
  if(typeof settingsOrSize === "string" || typeof settingsOrSize === "number")
    return EC2_EBS_GB("gp2", settingsOrSize, sizeOrRegion);
  else
    return EC2_EBS_GB_FROM_SETTINGS("gp2", settingsOrSize, sizeOrRegion, region);
}

// EBS GP3 storage
function EC2_EBS_GP3_GB(settingsOrSize, sizeOrRegion, region) {
  if(typeof settingsOrSize === "string" || typeof settingsOrSize === "number")
    return EC2_EBS_GB("gp3", settingsOrSize, sizeOrRegion);
  else
    return EC2_EBS_GB_FROM_SETTINGS("gp3", settingsOrSize, sizeOrRegion, region);
}

// EBS ST1 storage
function EC2_EBS_ST1_GB(settingsOrSize, sizeOrRegion, region) {
  if(typeof settingsOrSize === "string" || typeof settingsOrSize === "number")
    return EC2_EBS_GB("st1", settingsOrSize, sizeOrRegion);
  else
    return EC2_EBS_GB_FROM_SETTINGS("st1", settingsOrSize, sizeOrRegion, region);
}

// EBS SC1 storage
function EC2_EBS_SC1_GB(settingsOrSize, sizeOrRegion, region) {
  if(typeof settingsOrSize === "string" || typeof settingsOrSize === "number")
    return EC2_EBS_GB("sc1", settingsOrSize, sizeOrRegion);
  else
    return EC2_EBS_GB_FROM_SETTINGS("sc1", settingsOrSize, sizeOrRegion, region);
}

// EBS IO1 storage
function EC2_EBS_IO1_GB(settingsOrSize, sizeOrRegion, region) {
  if(typeof settingsOrSize === "string" || typeof settingsOrSize === "number")
    return EC2_EBS_GB("io1", settingsOrSize, sizeOrRegion);
  else
    return EC2_EBS_GB_FROM_SETTINGS("io1", settingsOrSize, sizeOrRegion, region);
}

// EBS IO2 storage
function EC2_EBS_IO2_GB(settingsOrSize, sizeOrRegion, region) {
  if(typeof settingsOrSize === "string" || typeof settingsOrSize === "number")
    return EC2_EBS_GB("io2", settingsOrSize, sizeOrRegion);
  else
    return EC2_EBS_GB_FROM_SETTINGS("io2", settingsOrSize, sizeOrRegion, region);
}

