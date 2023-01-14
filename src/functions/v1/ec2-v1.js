function EC2_LINUX_OD(instanceType, region) {
    return EC2_OD(instanceType, region, "linux")
}

function EC2_LINUX_MSSQL_OD(instanceType, region, sqlLicense) {
    validateSqlLicenceParameter(sqlLicense);
    return EC2_OD(instanceType, region, "linux_" + sqlLicense.toLowerCase())
}

function EC2_WINDOWS_MSSQL_OD(instanceType, region, sqlLicense) {
    validateSqlLicenceParameter(sqlLicense);
    return EC2_OD(instanceType, region, "windows_" + sqlLicense.toLowerCase())
}

function EC2_RHEL_OD(instanceType, region) {
    return EC2_OD(instanceType, region, "rhel")
}

function EC2_SUSE_OD(instanceType, region) {
    return EC2_OD(instanceType, region, "suse");
}

function EC2_WINDOWS_OD(instanceType, region) {
    return EC2_OD(instanceType, region, "windows")
}

function EC2(settingsValues, instanceType, region) {
    if (!settingsValues || settingsValues.length === 0 || settingsValues[0].length < 2) {
        throw "Missing required settings range"
    }

    const settings = mapValuesToObjectWithLowerCaseValues(settingsValues);

    // Example settings: (comes from a selection in an earlier version of AWS Pricing Sheets)
    //   {
    //     "region": "eu-central-2",
    //     "platform": "linux",
    //     "purchase_type": "ondemand",
    //     "offering_class": "standard",
    //     "purchase_term": 1,
    //     "payment_option": "no_upfront"
    //   }

    const options = {
        instanceType, // from argument instanceType
        region: region || settings.region,
        purchaseType: settings.purchase_type === "reserved" ? "reserved-instance" : "ondemand",
        platform: settings.platform || settings.operating_system, // earlier versions of the add-on used operating_system
        offeringClass: settings.offering_class,
        purchaseTerm: settings.purchase_term,
        paymentOption: settings.payment_option
    }

    return fetchApiEC2(options);
}

function validateSqlLicenceParameter(sqlLicense) {
    if (!sqlLicense) throw `Missing SQL License`;
    sqlLicense = sqlLicense.toLowerCase()

    if (!["std","web","enterprise"].includes(sqlLicense))
        throw `Invalid Microsoft SQL license: ${sqlLicense}`
}