function RDS_STORAGE_GB(settingsOrType, typeOrSize, sizeOrRegion, region) {
  return analyticsWrapper(arguments, () => {
    if(Array.isArray(settingsOrType)) {
      return RDS_STORAGE_FROM_SETTINGS({
        settings: settingsOrType, 
        storageType: typeOrSize, 
        storageSize: sizeOrRegion, 
        region
      });
    } else {
      return fetchApiRDSStorage({
        storageType: settingsOrType,
        storageSize: typeOrSize,
        region: sizeOrRegion
      });
    }
  });
}

function RDS_STORAGE_FROM_SETTINGS({settings, storageType, storageSize, region}) {
  if(!settings) throw 'Must specify a parameter';
  settings = map2dArrayToObjectWithLowerCaseValues(settings);

  return fetchApiRDSStorage({
    region: region || settings.region, 
    storageType,
    storageSize
  });
}
