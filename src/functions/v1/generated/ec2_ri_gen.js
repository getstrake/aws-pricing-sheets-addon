/* DO NOT EDIT -- this file is generated */

function EC2_LINUX_CONV_RI_NO(instanceType, region, purchaseTerm) {
    return EC2_RI(instanceType, region, "linux", "convertible", purchaseTerm, "no_upfront")
}

function EC2_LINUX_CONV_RI_PARTIAL(instanceType, region, purchaseTerm) {
    return EC2_RI(instanceType, region, "linux", "convertible", purchaseTerm, "partial_upfront")
}

function EC2_LINUX_CONV_RI_ALL(instanceType, region, purchaseTerm) {
    return EC2_RI(instanceType, region, "linux", "convertible", purchaseTerm, "all_upfront")
}

function EC2_LINUX_STD_RI_NO(instanceType, region, purchaseTerm) {
    return EC2_RI(instanceType, region, "linux", "standard", purchaseTerm, "no_upfront")
}

function EC2_LINUX_STD_RI_PARTIAL(instanceType, region, purchaseTerm) {
    return EC2_RI(instanceType, region, "linux", "standard", purchaseTerm, "partial_upfront")
}

function EC2_LINUX_STD_RI_ALL(instanceType, region, purchaseTerm) {
    return EC2_RI(instanceType, region, "linux", "standard", purchaseTerm, "all_upfront")
}

function EC2_RHEL_CONV_RI_NO(instanceType, region, purchaseTerm) {
    return EC2_RI(instanceType, region, "rhel", "convertible", purchaseTerm, "no_upfront")
}

function EC2_RHEL_CONV_RI_PARTIAL(instanceType, region, purchaseTerm) {
    return EC2_RI(instanceType, region, "rhel", "convertible", purchaseTerm, "partial_upfront")
}

function EC2_RHEL_CONV_RI_ALL(instanceType, region, purchaseTerm) {
    return EC2_RI(instanceType, region, "rhel", "convertible", purchaseTerm, "all_upfront")
}

function EC2_RHEL_STD_RI_NO(instanceType, region, purchaseTerm) {
    return EC2_RI(instanceType, region, "rhel", "standard", purchaseTerm, "no_upfront")
}

function EC2_RHEL_STD_RI_PARTIAL(instanceType, region, purchaseTerm) {
    return EC2_RI(instanceType, region, "rhel", "standard", purchaseTerm, "partial_upfront")
}

function EC2_RHEL_STD_RI_ALL(instanceType, region, purchaseTerm) {
    return EC2_RI(instanceType, region, "rhel", "standard", purchaseTerm, "all_upfront")
}

function EC2_SUSE_CONV_RI_NO(instanceType, region, purchaseTerm) {
    return EC2_RI(instanceType, region, "suse", "convertible", purchaseTerm, "no_upfront")
}

function EC2_SUSE_CONV_RI_PARTIAL(instanceType, region, purchaseTerm) {
    return EC2_RI(instanceType, region, "suse", "convertible", purchaseTerm, "partial_upfront")
}

function EC2_SUSE_CONV_RI_ALL(instanceType, region, purchaseTerm) {
    return EC2_RI(instanceType, region, "suse", "convertible", purchaseTerm, "all_upfront")
}

function EC2_SUSE_STD_RI_NO(instanceType, region, purchaseTerm) {
    return EC2_RI(instanceType, region, "suse", "standard", purchaseTerm, "no_upfront")
}

function EC2_SUSE_STD_RI_PARTIAL(instanceType, region, purchaseTerm) {
    return EC2_RI(instanceType, region, "suse", "standard", purchaseTerm, "partial_upfront")
}

function EC2_SUSE_STD_RI_ALL(instanceType, region, purchaseTerm) {
    return EC2_RI(instanceType, region, "suse", "standard", purchaseTerm, "all_upfront")
}

function EC2_WINDOWS_CONV_RI_NO(instanceType, region, purchaseTerm) {
    return EC2_RI(instanceType, region, "windows", "convertible", purchaseTerm, "no_upfront")
}

function EC2_WINDOWS_CONV_RI_PARTIAL(instanceType, region, purchaseTerm) {
    return EC2_RI(instanceType, region, "windows", "convertible", purchaseTerm, "partial_upfront")
}

function EC2_WINDOWS_CONV_RI_ALL(instanceType, region, purchaseTerm) {
    return EC2_RI(instanceType, region, "windows", "convertible", purchaseTerm, "all_upfront")
}

function EC2_WINDOWS_STD_RI_NO(instanceType, region, purchaseTerm) {
    return EC2_RI(instanceType, region, "windows", "standard", purchaseTerm, "no_upfront")
}

function EC2_WINDOWS_STD_RI_PARTIAL(instanceType, region, purchaseTerm) {
    return EC2_RI(instanceType, region, "windows", "standard", purchaseTerm, "partial_upfront")
}

function EC2_WINDOWS_STD_RI_ALL(instanceType, region, purchaseTerm) {
    return EC2_RI(instanceType, region, "windows", "standard", purchaseTerm, "all_upfront")
}

function EC2_LINUX_MSSQL_CONV_RI_NO(instanceType, region, sqlLicense, purchaseTerm) {
    validateSqlLicenceParameter(sqlLicense);
    return EC2_RI(instanceType, region, "linux_" + sqlLicense.toLowerCase(), "convertible", purchaseTerm, "no_upfront")
}

function EC2_LINUX_MSSQL_CONV_RI_PARTIAL(instanceType, region, sqlLicense, purchaseTerm) {
    validateSqlLicenceParameter(sqlLicense);
    return EC2_RI(instanceType, region, "linux_" + sqlLicense.toLowerCase(), "convertible", purchaseTerm, "partial_upfront")
}

function EC2_LINUX_MSSQL_CONV_RI_ALL(instanceType, region, sqlLicense, purchaseTerm) {
    validateSqlLicenceParameter(sqlLicense);
    return EC2_RI(instanceType, region, "linux_" + sqlLicense.toLowerCase(), "convertible", purchaseTerm, "all_upfront")
}

function EC2_LINUX_MSSQL_STD_RI_NO(instanceType, region, sqlLicense, purchaseTerm) {
    validateSqlLicenceParameter(sqlLicense);
    return EC2_RI(instanceType, region, "linux_" + sqlLicense.toLowerCase(), "standard", purchaseTerm, "no_upfront")
}

function EC2_LINUX_MSSQL_STD_RI_PARTIAL(instanceType, region, sqlLicense, purchaseTerm) {
    validateSqlLicenceParameter(sqlLicense);
    return EC2_RI(instanceType, region, "linux_" + sqlLicense.toLowerCase(), "standard", purchaseTerm, "partial_upfront")
}

function EC2_LINUX_MSSQL_STD_RI_ALL(instanceType, region, sqlLicense, purchaseTerm) {
    validateSqlLicenceParameter(sqlLicense);
    return EC2_RI(instanceType, region, "linux_" + sqlLicense.toLowerCase(), "standard", purchaseTerm, "all_upfront")
}

function EC2_WINDOWS_MSSQL_CONV_RI_NO(instanceType, region, sqlLicense, purchaseTerm) {
    validateSqlLicenceParameter(sqlLicense);
    return EC2_RI(instanceType, region, "windows_" + sqlLicense.toLowerCase(), "convertible", purchaseTerm, "no_upfront")
}

function EC2_WINDOWS_MSSQL_CONV_RI_PARTIAL(instanceType, region, sqlLicense, purchaseTerm) {
    validateSqlLicenceParameter(sqlLicense);
    return EC2_RI(instanceType, region, "windows_" + sqlLicense.toLowerCase(), "convertible", purchaseTerm, "partial_upfront")
}

function EC2_WINDOWS_MSSQL_CONV_RI_ALL(instanceType, region, sqlLicense, purchaseTerm) {
    validateSqlLicenceParameter(sqlLicense);
    return EC2_RI(instanceType, region, "windows_" + sqlLicense.toLowerCase(), "convertible", purchaseTerm, "all_upfront")
}

function EC2_WINDOWS_MSSQL_STD_RI_NO(instanceType, region, sqlLicense, purchaseTerm) {
    validateSqlLicenceParameter(sqlLicense);
    return EC2_RI(instanceType, region, "windows_" + sqlLicense.toLowerCase(), "standard", purchaseTerm, "no_upfront")
}

function EC2_WINDOWS_MSSQL_STD_RI_PARTIAL(instanceType, region, sqlLicense, purchaseTerm) {
    validateSqlLicenceParameter(sqlLicense);
    return EC2_RI(instanceType, region, "windows_" + sqlLicense.toLowerCase(), "standard", purchaseTerm, "partial_upfront")
}

function EC2_WINDOWS_MSSQL_STD_RI_ALL(instanceType, region, sqlLicense, purchaseTerm) {
    validateSqlLicenceParameter(sqlLicense);
    return EC2_RI(instanceType, region, "windows_" + sqlLicense.toLowerCase(), "standard", purchaseTerm, "all_upfront")
}

