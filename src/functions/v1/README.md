# Version 1 functions

The latest version of AWS Pricing is backward compatible with the previous version, ensuring that all existing functions continue to work. However, the dropdown menu for suggestions has been removed in this update.  

Our focus for this update is to create and enhance the generic AWS functions, which can be found in `src/functions/v2/AWS.js`  

In version 1 of the AWS Pricing Add-on, you could select a range with settings as the first argument. Some functions in this folder were designed to check for this in the first argument. Additionally, parameters were included in the function name, for example: RI in the formula EC2_RI() stands for "reserved instance".  

For further information about the formula's in version 1, you can refer to the documentation available in version 1 here: https://github.com/getmacroscope/aws-pricing/blob/master/Help.md

The github of version 1: https://github.com/getmacroscope/aws-pricing