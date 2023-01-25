/* DO NOT EDIT -- this file is generated */

function RDS_STORAGE_AURORA_GB(settingsOrSize, sizeOrRegion, region) {
  if (typeof settingsOrSize === "string" || typeof settingsOrSize === "number") {
      return fetchApiRDSStorage({ storageType: "aurora", storageSize: settingsOrSize, region: sizeOrRegion });
  } else {
      return RDS_STORAGE_FROM_SETTINGS({settings: settingsOrSize, storageType: "aurora", storageSize: sizeOrRegion, region});
  }
}
function RDS_STORAGE_GP2_GB(settingsOrSize, sizeOrRegion, region) {
  if (typeof settingsOrSize === "string" || typeof settingsOrSize === "number") {
      return fetchApiRDSStorage({ storageType: "gp2", storageSize: settingsOrSize, region: sizeOrRegion });
  } else {
      return RDS_STORAGE_FROM_SETTINGS({settings: settingsOrSize, storageType: "gp2", storageSize: sizeOrRegion, region});
  }
}
function RDS_STORAGE_PIOPS_GB(settingsOrSize, sizeOrRegion, region) {
  if (typeof settingsOrSize === "string" || typeof settingsOrSize === "number") {
      return fetchApiRDSStorage({ storageType: "piops", storageSize: settingsOrSize, region: sizeOrRegion });
  } else {
      return RDS_STORAGE_FROM_SETTINGS({settings: settingsOrSize, storageType: "piops", storageSize: sizeOrRegion, region});
  }
}
function RDS_STORAGE_MAGNETIC_GB(settingsOrSize, sizeOrRegion, region) {
  if (typeof settingsOrSize === "string" || typeof settingsOrSize === "number") {
      return fetchApiRDSStorage({ storageType: "magnetic", storageSize: settingsOrSize, region: sizeOrRegion });
  } else {
      return RDS_STORAGE_FROM_SETTINGS({settings: settingsOrSize, storageType: "magnetic", storageSize: sizeOrRegion, region});
  }
}
