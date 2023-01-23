function RDS_AURORA_MYSQL(settingsRange, instanceType, region) {
  return RDS_FROM_SETTINGS(settingsRange, "aurora/mysql", instanceType, region)
}

function RDS_AURORA_MYSQL_OD(instanceType, region) {
  return fetchApiRDS({ dbEngine: "aurora/mysql", instanceType, region, purchaseType: "ondemand"}); //, purchaseTerm, paymentOption });
}

function RDS_AURORA_MYSQL_RI(instanceType, region, purchaseTerm, paymentOption) {
  return fetchApiRDS({ dbEngine: "aurora/mysql", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm, paymentOption});
}

function RDS_AURORA_MYSQL_RI_NO(instanceType, region, purchaseTerm) {
  return fetchApiRDS({ dbEngine: "aurora/mysql", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm, paymentOption: "no_upfront"});
}

function RDS_AURORA_MYSQL_RI_PARTIAL(instanceType, region, purchaseTerm) {
  return fetchApiRDS({ dbEngine: "aurora/mysql", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm, paymentOption: "partial_upfront"});
}

function RDS_AURORA_MYSQL_RI_ALL(instanceType, region, purchaseTerm) {
  return fetchApiRDS({ dbEngine: "aurora/mysql", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm, paymentOption: "partial_upfront"});
}
