/* DO NOT EDIT -- this file is generated */

function RDS_AURORA_MYSQL(settingsRange, instanceType, region) {
  return RDS_FROM_SETTINGS(settingsRange, "aurora/mysql", instanceType, region)
}

function RDS_AURORA_MYSQL_OD(instanceType, region) {
  return fetchApiRDS({ dbEngine: "aurora/mysql", instanceType, region, purchaseType: "ondemand"})
}

function RDS_AURORA_MYSQL_RI(instanceType, region, purchaseTerm, paymentOption) {
  return fetchApiRDS({ dbEngine: "aurora/mysql", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm, paymentOption})
}

function RDS_AURORA_MYSQL_RI_NO(instanceType, region, purchaseTerm) {
  return fetchApiRDS({ dbEngine: "aurora/mysql", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm, paymentOption: "no_upfront"});
}

function RDS_AURORA_MYSQL_RI_PARTIAL(instanceType, region, purchaseTerm) {
  return fetchApiRDS({ dbEngine: "aurora/mysql", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm, paymentOption: "partial_upfront"});
}

function RDS_AURORA_MYSQL_RI_ALL(instanceType, region, purchaseTerm) {
  return fetchApiRDS({ dbEngine: "aurora/mysql", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm, paymentOption: "all_upfront"});
}

function RDS_AURORA_POSTGRESQL(settingsRange, instanceType, region) {
  return RDS_FROM_SETTINGS(settingsRange, "aurora/postgresql", instanceType, region)
}

function RDS_AURORA_POSTGRESQL_OD(instanceType, region) {
  return fetchApiRDS({ dbEngine: "aurora/postgresql", instanceType, region, purchaseType: "ondemand"})
}

function RDS_AURORA_POSTGRESQL_RI(instanceType, region, purchaseTerm, paymentOption) {
  return fetchApiRDS({ dbEngine: "aurora/postgresql", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm, paymentOption})
}

function RDS_AURORA_POSTGRESQL_RI_NO(instanceType, region, purchaseTerm) {
  return fetchApiRDS({ dbEngine: "aurora/postgresql", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm, paymentOption: "no_upfront"});
}

function RDS_AURORA_POSTGRESQL_RI_PARTIAL(instanceType, region, purchaseTerm) {
  return fetchApiRDS({ dbEngine: "aurora/postgresql", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm, paymentOption: "partial_upfront"});
}

function RDS_AURORA_POSTGRESQL_RI_ALL(instanceType, region, purchaseTerm) {
  return fetchApiRDS({ dbEngine: "aurora/postgresql", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm, paymentOption: "all_upfront"});
}

function RDS_MYSQL(settingsRange, instanceType, region) {
  return RDS_FROM_SETTINGS(settingsRange, "mysql", instanceType, region)
}

function RDS_MYSQL_OD(instanceType, region) {
  return fetchApiRDS({ dbEngine: "mysql", instanceType, region, purchaseType: "ondemand"})
}

function RDS_MYSQL_RI(instanceType, region, purchaseTerm, paymentOption) {
  return fetchApiRDS({ dbEngine: "mysql", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm, paymentOption})
}

function RDS_MYSQL_RI_NO(instanceType, region, purchaseTerm) {
  return fetchApiRDS({ dbEngine: "mysql", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm, paymentOption: "no_upfront"});
}

function RDS_MYSQL_RI_PARTIAL(instanceType, region, purchaseTerm) {
  return fetchApiRDS({ dbEngine: "mysql", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm, paymentOption: "partial_upfront"});
}

function RDS_MYSQL_RI_ALL(instanceType, region, purchaseTerm) {
  return fetchApiRDS({ dbEngine: "mysql", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm, paymentOption: "all_upfront"});
}

function RDS_POSTGRESQL(settingsRange, instanceType, region) {
  return RDS_FROM_SETTINGS(settingsRange, "postgresql", instanceType, region)
}

function RDS_POSTGRESQL_OD(instanceType, region) {
  return fetchApiRDS({ dbEngine: "postgresql", instanceType, region, purchaseType: "ondemand"})
}

function RDS_POSTGRESQL_RI(instanceType, region, purchaseTerm, paymentOption) {
  return fetchApiRDS({ dbEngine: "postgresql", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm, paymentOption})
}

function RDS_POSTGRESQL_RI_NO(instanceType, region, purchaseTerm) {
  return fetchApiRDS({ dbEngine: "postgresql", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm, paymentOption: "no_upfront"});
}

function RDS_POSTGRESQL_RI_PARTIAL(instanceType, region, purchaseTerm) {
  return fetchApiRDS({ dbEngine: "postgresql", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm, paymentOption: "partial_upfront"});
}

function RDS_POSTGRESQL_RI_ALL(instanceType, region, purchaseTerm) {
  return fetchApiRDS({ dbEngine: "postgresql", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm, paymentOption: "all_upfront"});
}

function RDS_MARIADB(settingsRange, instanceType, region) {
  return RDS_FROM_SETTINGS(settingsRange, "mariadb", instanceType, region)
}

function RDS_MARIADB_OD(instanceType, region) {
  return fetchApiRDS({ dbEngine: "mariadb", instanceType, region, purchaseType: "ondemand"})
}

function RDS_MARIADB_RI(instanceType, region, purchaseTerm, paymentOption) {
  return fetchApiRDS({ dbEngine: "mariadb", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm, paymentOption})
}

function RDS_MARIADB_RI_NO(instanceType, region, purchaseTerm) {
  return fetchApiRDS({ dbEngine: "mariadb", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm, paymentOption: "no_upfront"});
}

function RDS_MARIADB_RI_PARTIAL(instanceType, region, purchaseTerm) {
  return fetchApiRDS({ dbEngine: "mariadb", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm, paymentOption: "partial_upfront"});
}

function RDS_MARIADB_RI_ALL(instanceType, region, purchaseTerm) {
  return fetchApiRDS({ dbEngine: "mariadb", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm, paymentOption: "all_upfront"});
}

