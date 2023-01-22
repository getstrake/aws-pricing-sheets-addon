/* DO NOT EDIT -- this file is generated */

// EBS MAGNETIC storage
function EC2_EBS_MAGNETIC_GB(settingsOrSize, sizeOrRegion, region) {
  if(typeof settingsOrSize === "string" || typeof settingsOrSize === "number")
    return EC2_EBS_GB("magnetic", settingsOrSize, sizeOrRegion);
  else
    return EC2_EBS_FROM_SETTINGS(
      {
          settings: settingsOrSize, 
          volumeType: "magnetic", 
          storageType: "storage", 
          volumeSize: sizeOrRegion, 
          region
      }
  );
}

// EBS GP2 storage
function EC2_EBS_GP2_GB(settingsOrSize, sizeOrRegion, region) {
  if(!settingsOrSize) throw `must specify parameter`;
  if(typeof settingsOrSize === "string" || typeof settingsOrSize === "number")
    return EC2_EBS_GB("gp2", settingsOrSize, sizeOrRegion);
  else
    return EC2_EBS_FROM_SETTINGS(
      {
          settings: settingsOrSize, 
          volumeType: "gp2", 
          storageType: "storage", 
          volumeSize: sizeOrRegion, 
          region
      }
  );
}

// EBS GP3 storage
function EC2_EBS_GP3_GB(settingsOrSize, sizeOrRegion, region) {
  if(typeof settingsOrSize === "string" || typeof settingsOrSize === "number")
    return EC2_EBS_GB("gp3", settingsOrSize, sizeOrRegion);
  else
    return EC2_EBS_FROM_SETTINGS(
      {
          settings: settingsOrSize, 
          volumeType: "gp3", 
          storageType: "storage", 
          volumeSize: sizeOrRegion, 
          region
      }
  );
}

// EBS ST1 storage
function EC2_EBS_ST1_GB(settingsOrSize, sizeOrRegion, region) {
  if(typeof settingsOrSize === "string" || typeof settingsOrSize === "number")
    return EC2_EBS_GB("st1", settingsOrSize, sizeOrRegion);
  else
    return EC2_EBS_FROM_SETTINGS(
      {
          settings: settingsOrSize, 
          volumeType: "st1", 
          storageType: "storage", 
          volumeSize: sizeOrRegion, 
          region
      }
  );
}

// EBS SC1 storage
function EC2_EBS_SC1_GB(settingsOrSize, sizeOrRegion, region) {
  if(typeof settingsOrSize === "string" || typeof settingsOrSize === "number")
    return EC2_EBS_GB("sc1", settingsOrSize, sizeOrRegion);
  else
    return EC2_EBS_FROM_SETTINGS(
      {
          settings: settingsOrSize, 
          volumeType: "sc1", 
          storageType: "storage", 
          volumeSize: sizeOrRegion, 
          region
      }
  );
}

// EBS IO1 storage
function EC2_EBS_IO1_GB(settingsOrSize, sizeOrRegion, region) {
  if(typeof settingsOrSize === "string" || typeof settingsOrSize === "number")
    return EC2_EBS_GB("io1", settingsOrSize, sizeOrRegion);
  else
    return EC2_EBS_FROM_SETTINGS(
      {
          settings: settingsOrSize, 
          volumeType: "io1", 
          storageType: "storage", 
          volumeSize: sizeOrRegion, 
          region
      }
  );
}

// EBS IO2 storage
function EC2_EBS_IO2_GB(settingsOrSize, sizeOrRegion, region) {
  if(typeof settingsOrSize === "string" || typeof settingsOrSize === "number")
    return EC2_EBS_GB("io2", settingsOrSize, sizeOrRegion);
  else
    return EC2_EBS_FROM_SETTINGS(
      {
          settings: settingsOrSize, 
          volumeType: "io2", 
          storageType: "storage", 
          volumeSize: sizeOrRegion, 
          region
      }
  );
}

