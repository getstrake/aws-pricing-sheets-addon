/* DO NOT EDIT -- this file is generated */

function RDS_AURORA_MYSQL(settingsRange, instanceType, region) {
  return analyticsWrapper(arguments, () => {
    return RDS_FROM_SETTINGS(settingsRange, "aurora/mysql", instanceType, region)
  });
}

function RDS_AURORA_MYSQL_OD(instanceType, region) {
  return analyticsWrapper(arguments, () => {
    return fetchApiRDS({ dbEngine: "aurora/mysql", instanceType, region, purchaseType: "ondemand"});
  });
}

function RDS_AURORA_MYSQL_RI(instanceType, region, purchaseTerm, paymentOption) {
  return analyticsWrapper(arguments, () => {
    // version 1 of AWS Pricing has purchaseTerm: 1 (instead of "1yr")
    return fetchApiRDS({ dbEngine: "aurora/mysql", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm: purchaseTerm + "yr", paymentOption});
  });
}

function RDS_AURORA_MYSQL_RI_NO(instanceType, region, purchaseTerm) {
  return analyticsWrapper(arguments, () => {
    // version 1 of AWS Pricing has purchaseTerm: 1 (instead of "1yr")
    return fetchApiRDS({ dbEngine: "aurora/mysql", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm: purchaseTerm + "yr", paymentOption: "no_upfront"});
  });
}

function RDS_AURORA_MYSQL_RI_PARTIAL(instanceType, region, purchaseTerm) {
  return analyticsWrapper(arguments, () => {
    // version 1 of AWS Pricing has purchaseTerm: 1 (instead of "1yr")
    return fetchApiRDS({ dbEngine: "aurora/mysql", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm: purchaseTerm + "yr", paymentOption: "partial_upfront"});
  });
}

function RDS_AURORA_MYSQL_RI_ALL(instanceType, region, purchaseTerm) {
  return analyticsWrapper(arguments, () => {
    // version 1 of AWS Pricing has purchaseTerm: 1 (instead of "1yr")
    return fetchApiRDS({ dbEngine: "aurora/mysql", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm: purchaseTerm + "yr", paymentOption: "all_upfront"});
  });
}

function RDS_AURORA_POSTGRESQL(settingsRange, instanceType, region) {
  return analyticsWrapper(arguments, () => {
    return RDS_FROM_SETTINGS(settingsRange, "aurora/postgresql", instanceType, region)
  });
}

function RDS_AURORA_POSTGRESQL_OD(instanceType, region) {
  return analyticsWrapper(arguments, () => {
    return fetchApiRDS({ dbEngine: "aurora/postgresql", instanceType, region, purchaseType: "ondemand"});
  });
}

function RDS_AURORA_POSTGRESQL_RI(instanceType, region, purchaseTerm, paymentOption) {
  return analyticsWrapper(arguments, () => {
    // version 1 of AWS Pricing has purchaseTerm: 1 (instead of "1yr")
    return fetchApiRDS({ dbEngine: "aurora/postgresql", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm: purchaseTerm + "yr", paymentOption});
  });
}

function RDS_AURORA_POSTGRESQL_RI_NO(instanceType, region, purchaseTerm) {
  return analyticsWrapper(arguments, () => {
    // version 1 of AWS Pricing has purchaseTerm: 1 (instead of "1yr")
    return fetchApiRDS({ dbEngine: "aurora/postgresql", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm: purchaseTerm + "yr", paymentOption: "no_upfront"});
  });
}

function RDS_AURORA_POSTGRESQL_RI_PARTIAL(instanceType, region, purchaseTerm) {
  return analyticsWrapper(arguments, () => {
    // version 1 of AWS Pricing has purchaseTerm: 1 (instead of "1yr")
    return fetchApiRDS({ dbEngine: "aurora/postgresql", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm: purchaseTerm + "yr", paymentOption: "partial_upfront"});
  });
}

function RDS_AURORA_POSTGRESQL_RI_ALL(instanceType, region, purchaseTerm) {
  return analyticsWrapper(arguments, () => {
    // version 1 of AWS Pricing has purchaseTerm: 1 (instead of "1yr")
    return fetchApiRDS({ dbEngine: "aurora/postgresql", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm: purchaseTerm + "yr", paymentOption: "all_upfront"});
  });
}

function RDS_MYSQL(settingsRange, instanceType, region) {
  return analyticsWrapper(arguments, () => {
    return RDS_FROM_SETTINGS(settingsRange, "mysql", instanceType, region)
  });
}

function RDS_MYSQL_OD(instanceType, region) {
  return analyticsWrapper(arguments, () => {
    return fetchApiRDS({ dbEngine: "mysql", instanceType, region, purchaseType: "ondemand"});
  });
}

function RDS_MYSQL_RI(instanceType, region, purchaseTerm, paymentOption) {
  return analyticsWrapper(arguments, () => {
    // version 1 of AWS Pricing has purchaseTerm: 1 (instead of "1yr")
    return fetchApiRDS({ dbEngine: "mysql", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm: purchaseTerm + "yr", paymentOption});
  });
}

function RDS_MYSQL_RI_NO(instanceType, region, purchaseTerm) {
  return analyticsWrapper(arguments, () => {
    // version 1 of AWS Pricing has purchaseTerm: 1 (instead of "1yr")
    return fetchApiRDS({ dbEngine: "mysql", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm: purchaseTerm + "yr", paymentOption: "no_upfront"});
  });
}

function RDS_MYSQL_RI_PARTIAL(instanceType, region, purchaseTerm) {
  return analyticsWrapper(arguments, () => {
    // version 1 of AWS Pricing has purchaseTerm: 1 (instead of "1yr")
    return fetchApiRDS({ dbEngine: "mysql", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm: purchaseTerm + "yr", paymentOption: "partial_upfront"});
  });
}

function RDS_MYSQL_RI_ALL(instanceType, region, purchaseTerm) {
  return analyticsWrapper(arguments, () => {
    // version 1 of AWS Pricing has purchaseTerm: 1 (instead of "1yr")
    return fetchApiRDS({ dbEngine: "mysql", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm: purchaseTerm + "yr", paymentOption: "all_upfront"});
  });
}

function RDS_POSTGRESQL(settingsRange, instanceType, region) {
  return analyticsWrapper(arguments, () => {
    return RDS_FROM_SETTINGS(settingsRange, "postgresql", instanceType, region)
  });
}

function RDS_POSTGRESQL_OD(instanceType, region) {
  return analyticsWrapper(arguments, () => {
    return fetchApiRDS({ dbEngine: "postgresql", instanceType, region, purchaseType: "ondemand"});
  });
}

function RDS_POSTGRESQL_RI(instanceType, region, purchaseTerm, paymentOption) {
  return analyticsWrapper(arguments, () => {
    // version 1 of AWS Pricing has purchaseTerm: 1 (instead of "1yr")
    return fetchApiRDS({ dbEngine: "postgresql", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm: purchaseTerm + "yr", paymentOption});
  });
}

function RDS_POSTGRESQL_RI_NO(instanceType, region, purchaseTerm) {
  return analyticsWrapper(arguments, () => {
    // version 1 of AWS Pricing has purchaseTerm: 1 (instead of "1yr")
    return fetchApiRDS({ dbEngine: "postgresql", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm: purchaseTerm + "yr", paymentOption: "no_upfront"});
  });
}

function RDS_POSTGRESQL_RI_PARTIAL(instanceType, region, purchaseTerm) {
  return analyticsWrapper(arguments, () => {
    // version 1 of AWS Pricing has purchaseTerm: 1 (instead of "1yr")
    return fetchApiRDS({ dbEngine: "postgresql", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm: purchaseTerm + "yr", paymentOption: "partial_upfront"});
  });
}

function RDS_POSTGRESQL_RI_ALL(instanceType, region, purchaseTerm) {
  return analyticsWrapper(arguments, () => {
    // version 1 of AWS Pricing has purchaseTerm: 1 (instead of "1yr")
    return fetchApiRDS({ dbEngine: "postgresql", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm: purchaseTerm + "yr", paymentOption: "all_upfront"});
  });
}

function RDS_MARIADB(settingsRange, instanceType, region) {
  return analyticsWrapper(arguments, () => {
    return RDS_FROM_SETTINGS(settingsRange, "mariadb", instanceType, region)
  });
}

function RDS_MARIADB_OD(instanceType, region) {
  return analyticsWrapper(arguments, () => {
    return fetchApiRDS({ dbEngine: "mariadb", instanceType, region, purchaseType: "ondemand"});
  });
}

function RDS_MARIADB_RI(instanceType, region, purchaseTerm, paymentOption) {
  return analyticsWrapper(arguments, () => {
    // version 1 of AWS Pricing has purchaseTerm: 1 (instead of "1yr")
    return fetchApiRDS({ dbEngine: "mariadb", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm: purchaseTerm + "yr", paymentOption});
  });
}

function RDS_MARIADB_RI_NO(instanceType, region, purchaseTerm) {
  return analyticsWrapper(arguments, () => {
    // version 1 of AWS Pricing has purchaseTerm: 1 (instead of "1yr")
    return fetchApiRDS({ dbEngine: "mariadb", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm: purchaseTerm + "yr", paymentOption: "no_upfront"});
  });
}

function RDS_MARIADB_RI_PARTIAL(instanceType, region, purchaseTerm) {
  return analyticsWrapper(arguments, () => {
    // version 1 of AWS Pricing has purchaseTerm: 1 (instead of "1yr")
    return fetchApiRDS({ dbEngine: "mariadb", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm: purchaseTerm + "yr", paymentOption: "partial_upfront"});
  });
}

function RDS_MARIADB_RI_ALL(instanceType, region, purchaseTerm) {
  return analyticsWrapper(arguments, () => {
    // version 1 of AWS Pricing has purchaseTerm: 1 (instead of "1yr")
    return fetchApiRDS({ dbEngine: "mariadb", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm: purchaseTerm + "yr", paymentOption: "all_upfront"});
  });
}

