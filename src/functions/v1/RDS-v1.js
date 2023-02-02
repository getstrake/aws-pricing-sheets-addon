function RDS_FROM_SETTINGS(settingsRange, dbEngine, instanceType, region) {
  if (!settingsRange || settingsRange.length === 0 || settingsRange[0].length < 2) {
      throw "Missing required settings range"
  }

  const settings = map2dArrayToObjectWithLowerCaseValues(settingsRange);

  // console.log({settings})
  const options = {
    dbEngine: dbEngine || settings.db_engine,
    instanceType: instanceType,
    region: region || settings.region,
    purchaseType: settings.purchase_type === "reserved" ? "reserved-instance" : settings.purchase_type, 
    purchaseTerm: settings.purchase_term + "yr", // version 1 of the add-on used purchase_term as a number 
    paymentOption: settings.payment_option
  }
  // console.log({options})
  return fetchApiRDS(options);
}
