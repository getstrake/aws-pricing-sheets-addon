/* DO NOT EDIT -- this file is generated */

// EBS MAGNETIC storage
function EC2_EBS_MAGNETIC_GB(settingsOrSize, sizeOrRegion, region) {
  return analyticsWrapper(arguments, () => {
    if(typeof settingsOrSize === "string" || typeof settingsOrSize === "number")
      return fetchApiEBS({
        volumeType: "magnetic", 
        volumeSize: settingsOrSize, 
        region: sizeOrRegion, 
        storageType: "storage"
      })
    else
      return _EC2_EBS_FROM_SETTINGS({
        settings: settingsOrSize, 
        volumeType: "magnetic", 
        storageType: "storage", 
        volumeSize: sizeOrRegion, 
        region
    });
  });
}

// EBS GP2 storage
function EC2_EBS_GP2_GB(settingsOrSize, sizeOrRegion, region) {
  return analyticsWrapper(arguments, () => {
    if(!Array.isArray(settingsOrSize))
      return fetchApiEBS({
        volumeType: "gp2", 
        volumeSize: settingsOrSize, 
        region: sizeOrRegion, 
        storageType: "storage"
      })
    else
      return _EC2_EBS_FROM_SETTINGS({
        settings: settingsOrSize, 
        volumeType: "gp2", 
        storageType: "storage", 
        volumeSize: sizeOrRegion, 
        region
    });
  });
}

// EBS GP3 storage
function EC2_EBS_GP3_GB(settingsOrSize, sizeOrRegion, region) {
  return analyticsWrapper(arguments, () => {
    if(typeof settingsOrSize === "string" || typeof settingsOrSize === "number")
      return fetchApiEBS({
        volumeType: "gp3", 
        volumeSize: settingsOrSize, 
        region: sizeOrRegion, 
        storageType: "storage"
      })
    else
      return _EC2_EBS_FROM_SETTINGS({
        settings: settingsOrSize, 
        volumeType: "gp3", 
        storageType: "storage", 
        volumeSize: sizeOrRegion, 
        region
    });
  });
}

// EBS ST1 storage
function EC2_EBS_ST1_GB(settingsOrSize, sizeOrRegion, region) {
  return analyticsWrapper(arguments, () => {
    if(typeof settingsOrSize === "string" || typeof settingsOrSize === "number")
      return fetchApiEBS({
        volumeType: "st1", 
        volumeSize: settingsOrSize, 
        region: sizeOrRegion, 
        storageType: "storage"
      })
    else
      return _EC2_EBS_FROM_SETTINGS({
        settings: settingsOrSize, 
        volumeType: "st1", 
        storageType: "storage", 
        volumeSize: sizeOrRegion, 
        region
    });
  });
}

// EBS SC1 storage
function EC2_EBS_SC1_GB(settingsOrSize, sizeOrRegion, region) {
  return analyticsWrapper(arguments, () => {
    if(typeof settingsOrSize === "string" || typeof settingsOrSize === "number")
      return fetchApiEBS({
        volumeType: "sc1", 
        volumeSize: settingsOrSize, 
        region: sizeOrRegion, 
        storageType: "storage"
      })
    else
      return _EC2_EBS_FROM_SETTINGS({
        settings: settingsOrSize, 
        volumeType: "sc1", 
        storageType: "storage", 
        volumeSize: sizeOrRegion, 
        region
    });
  });
}

// EBS IO1 storage
function EC2_EBS_IO1_GB(settingsOrSize, sizeOrRegion, region) {
  return analyticsWrapper(arguments, () => {
    if(typeof settingsOrSize === "string" || typeof settingsOrSize === "number")
      return fetchApiEBS({
        volumeType: "io1", 
        volumeSize: settingsOrSize, 
        region: sizeOrRegion, 
        storageType: "storage"
      })
    else
      return _EC2_EBS_FROM_SETTINGS({
        settings: settingsOrSize, 
        volumeType: "io1", 
        storageType: "storage", 
        volumeSize: sizeOrRegion, 
        region
    });
  });
}

// EBS IO2 storage
function EC2_EBS_IO2_GB(settingsOrSize, sizeOrRegion, region) {
  return analyticsWrapper(arguments, () => {
    if(typeof settingsOrSize === "string" || typeof settingsOrSize === "number")
      return fetchApiEBS({
        volumeType: "io2", 
        volumeSize: settingsOrSize, 
        region: sizeOrRegion, 
        storageType: "storage"
      })
    else
      return _EC2_EBS_FROM_SETTINGS({
        settings: settingsOrSize, 
        volumeType: "io2", 
        storageType: "storage", 
        volumeSize: sizeOrRegion, 
        region
    });
  });
}

