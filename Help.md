# AWS Pricing add-on

The AWS Pricing Google Sheets add-on allows you to incorporate the latest AWS pricing data in your Google Sheets spreadsheets. This makes it easy to perform cloud cost analysis directly in Sheets without error-prone copy-and-paste from pricing websites. Pricing data tracks the latest discounts from AWS.

### Supported services

The following services are currently supported with more to come:

* EC2 instances (Linux, RHEL, SUSE and Windows)
* EBS storage, Provisioned IOPS and snapshots
* RDS DB instances
* RDS Storage

Pricing options support on-demand and reserved purchasing.

### Call syntax

This addon supplies multiple custom functions that you can invoke from a Google Sheets cell. To invoke a custom function (or any function), start by typing a "`=AWS`". The sheets editor will popup a command completion dialog that searches as you type. All the functions here include parameter documentation that will appear when you've selected a particular function and help describe the order of parameters.

Functions are documented here without the required leading "`=`" for ease of reading.

### EC2 Instance Parameters

These define the parameters used in the following functions and instance settings.

* `instanceType`: name of instance represented as `<class>.<size>`, eg `m5.xlarge`
* `region`: name of AWS region, eg `us-east-1` and `eu-west-1`
* `purchaseType`: name of the purchasing type, either `ondemand` or `reserved`
* `platform`: name of OS platform, currently supports: `linux`, `windows`, `rhel`, `suse`, `linux_std` (Linux SQL Standard), `linux_web` (Linux SQL Web), `linux_enterprise` (Linux SQL Enterprise), `windows_std` (Windows SQL Std), `windows_web` (Windows SQL Web), `windows_enterprise` (Windows SQL Enterprise)
* `sqlLicense`: name of MSSQL license, either: `std`, `web`, or `enterprise`
* `offeringClass`: type of reserved instance, either `standard` or `convertible`
* `purchaseTerm`: duration of reserved instance purchase in years, either `"1yr"` or `"3yr"`
* `paymentOption`: payment option of reserved instance, either `no_upfront`, `partial_upfront`, or `all_upfront`

### EC2 On-demand Functions

To explicitly grab on-demand pricing use this function:

* `AWS_EC2("ondemand", instanceType, region, platform)`

### EC2 RI Functions

The simplest EC2 RI function requires multiple parameters to specify all the RI pricing details:

* `AWS_EC2("reserved", instanceType, region, platform, offeringClass, purchaseTerm, paymentOption)`

### EC2 RI Function with SQL License

* `AWS_EC2("reserved", instanceType, region, platform, offeringClass, purchaseTerm, paymentOption, sqlLicense)`

Where `sqlLicense` is either *web*, *std*, or *enterprise* and `platform` is either *linux* or *windows*.

### EC2 Pricing Duration

Prices are currently returned in hourly durations. The price is the *effective* hourly rate when using reserved instances.

### EBS Storage

You can compute the cost of EBS storage and provisioned IOPS with the `AWS_EBS()` functions. 

* `AWS_EBS(volumeType, storageType, volumeSize, region)`

### EBS Computing Storage

The generic function for computing storage is:  

* `AWS_EBS(volumeType, "storage", volumeSize, region)`

The supported parameters are:

* `volumeType`: The type of volume (*magnetic*, *gp2*, *io1*, *io2*, *st1* or *sc1*)
* `volumeSize`: Size in number of provisioned Gigabytes
* `region`: for example *us-east-2*

### EBS Provisioned IOPS

Provisioned IOPS pricing is only supported on *io1*, *io2* and *gp3* volume types.
Both functions take the number of *iops* in the parameter `volumeSize` to calculate for.

* `AWS_EBS("io1", "iops", volumeSize, region)`

For IO2 IOPS, the functions are the same but will calculate rates using the tiered pricing model.

* `AWS_EBS("io2", "iops", volumeSize, region)`

For GP3 IOPS it is similar tiered pricing, but the first tier is free.

* `AWS_EBS("gp3", "iops", volumeSize, region)`

### EBS Snapshot storage

EBS snapshot cost is measured by the amount of stored Gigabytes using the following functions.  
Note that the first argument is empty. 

* `AWS_EBS("", "snapshot", volumeSize, region)`

### RDS Instances

*AWS Pricing* supports custom functions for RDS on-demand and reserved-instance pricing.

### RDS DB Engines

RDS DB instance pricing supports the following RDS DB engines. In parentheses, you will find the proper notation for writing the database engine.

* Aurora MySQL (`"aurora/mysql"`)
* Aurora PostgreSQL (`"aurora/postgresql"`)
* MySQL (`"mysql"`)
* PostgreSQL (`"postgresql"`)
* MariaDB (`"mariadb"`)

To use the settings in an RDS call, invoke the appropriate function for the DB engine like:


And for reserved instances like:  


For example, to lookup the price for an Aurora MySQL on-demand instance running on a *db.r4.2xlarge* in region "us-east-2", use the following call:  
* `AWS_RDS("aurora/mysql", "db.r4.2xlarge", "us-east-2", "ondemand")`


### RDS On-demand instances

To lookup the on-demand price for a DB instance you can use the explicit call:
* `AWS_RDS(dbEngine, instanceType, region, "ondemand")`

### RDS Reserved instances

To lookup reserved-instance pricing for DB instances uses the following call pattern:
* `AWS_RDS(dbEngine, instanceType, region, "reserved", purchaseTerm, paymentOption)`

For example, the following call pulls the pricing for an MariaDB reserved instance on a 3yr, all-upfront RI:
* `AWS_RDS("mariadb", "db.r4.2xlarge", "ca-central-1", "reserved", "3yr", "all_upfront")`

There are two purchase terms:
`"1yr"`, `"3yr"`

There are three payment options:
`"all_upfront"`, `"no_upfront"`, `"partial_upfront"`

### RDS Pricing duration

All RDS functions return the effective price *per hour*.

### RDS Storage

You can compute the cost of provisioned RDS storage using the `AWS_RDS_STORAGE` function. This function take the storage type, the size of the volume in Gigabytes and return the hourly cost for the amount of provisioned storage.  
The supported `volumeType`'s are: *aurora*, *gp2*, *piops* and *magnetic*.

* `AWS_RDS_STORAGE(storageType, storageSize, region)`

Storage type can be "aurora", "gp2", "piops" and "magnetic"

### Backwards compatibility

This add-on is compatible with a previous version, allowing you to continue using the function notation from that version in your sheets. However, note that the sheets editor's pop-up suggestion feature will not be available. For more information about the formulas from version 1, please refer to [the following link](https://github.com/getmacroscope/aws-pricing/blob/master/Help.md)
