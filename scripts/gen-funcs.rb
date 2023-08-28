#!/usr/bin/env ruby

def create_file(filename)
  f = File.open(filename, File::CREAT|File::TRUNC|File::WRONLY, 0664)

  f.write "/* DO NOT EDIT -- this file is generated */\n"
  f.write "\n"

  f
end 

#
# EC2 RI functions
#
def gen_ec2_ri(func_dir)
  outfilename = 'ec2_ri_gen.js'
  outfile = File.join(func_dir, outfilename)
  
  f = create_file(outfile)
  
  platforms = ["linux", "rhel", "suse", "windows"]
  ri_classes = {
      "convertible" => "conv",
      "standard" => "std"
  }
  
  payment_options = {
      "no_upfront" => "no",
      "partial_upfront" => "partial",
      "all_upfront" => "all"
  }
  
  platforms.each do |platform|
      ri_classes.each do |ri_class|
          payment_options.each do |payment_option|
            # /**
            #  * Returns the RI pricing for an instance type with a #{ri_class[0]}, #{payment_option[0].gsub("_", "-")} RI using #{platform}.
            #  *
            #  * @param {"m5.xlarge"} instanceType Instance type, eg. "m5.xlarge"
            #  * @param {"us-east-2"} region
            #  * @param {1} purchaseTerm Duration of RI in years (1 or 3)
            #  * @returns price
            #  * @customfunction
            #  */
              func = <<~EOF
              function EC2_#{platform.upcase}_#{ri_class[1].upcase}_RI_#{payment_option[1].upcase}(instanceType, region, purchaseTerm) {
                  return EC2_RI(instanceType, region, "#{platform}", "#{ri_class[0]}", purchaseTerm, "#{payment_option[0]}")
              }
  
              EOF
              f.write(func)
          end
      end
  end
  
  sql_platforms = ["linux", "windows"]
  
  sql_platforms.each do |sql_platform|
      ri_classes.each do |ri_class|
          payment_options.each do |payment_option|
            # /**
            #    * Returns the RI pricing for an instance type with a #{ri_class[0]}, #{payment_option[0].gsub("_", "-")} RI using #{sql_platform} SQL.
            #    *
            #    * @param {"m5.xlarge"} instanceType Instance type, eg. "m5.xlarge"
            #    * @param {"us-east-2"} region
            #    * @param {"web"} sqlLicense (std, web, or enterprise)
            #    * @param {1} purchaseTerm Duration of RI in years (1 or 3)
            #    * @returns price
            #    * @customfunction
            #    */
              func = <<~EOF
              function EC2_#{sql_platform.upcase}_MSSQL_#{ri_class[1].upcase}_RI_#{payment_option[1].upcase}(instanceType, region, sqlLicense, purchaseTerm) {
                  validateSqlLicenceParameter(sqlLicense);
                  return EC2_RI(instanceType, region, "#{sql_platform}_" + sqlLicense.toLowerCase(), "#{ri_class[0]}", purchaseTerm, "#{payment_option[0]}")
              }
  
              EOF
              f.write(func)
          end
      end
  end
  
  f.close
end

def gen_ebs(func_dir)
  outfilename = 'ec2_ebs_gen.js'
  outfile = File.join(func_dir, outfilename)
  
  f = create_file(outfile)

  vol_types = ['magnetic', 'gp2', 'gp3', 'st1', 'sc1', 'io1', 'io2']

  vol_types.each do |vol_type|
      vol_type_up = vol_type.upcase
      # function EC2_EBS_#{vol_type_up}_GB(settingsRange: Array<Array<string>>, size: string | number, region?: string): number;
      # function EC2_EBS_#{vol_type_up}_GB(size: string | number, region: string): number;

      #  /**
      #  * Returns the hourly cost for the amount of provisioned EBS #{vol_type_up} storage Gigabytes. Invoke as either:
      #  * (settingsRange, size[, region]) or (size, region).
      #  *
      #  * @param {A2:B7 or 4000} settingsOrSize Settings range or volume size
      #  * @param {4000 or "us-east-2"} sizeOrRegion Either a volume size or the region
      #  * @param {"us-east-2"} region AWS region (optional)
      #  * @returns price
      #  * @customfunction
      #  */
    #   function EC2_EBS_#{vol_type_up}_GB(settingsOrSize, sizeOrRegion, region?) {
    #     if (typeof settingsOrSize === "string" || typeof settingsOrSize === "number") {
    #         return EBSFunctions.EC2_EBS_GB("#{vol_type}", settingsOrSize.toString(), sizeOrRegion)
    #     } else {
    #         return EBSFunctions.EC2_EBS_GB(settingsOrSize, "#{vol_type}", sizeOrRegion, region)
    #     }
    # }
      func = <<~EOF
      // EBS #{vol_type_up} storage
      function EC2_EBS_#{vol_type_up}_GB(settingsOrSize, sizeOrRegion, region) {
        return analyticsWrapper(arguments, () => {
          if(!Array.isArray(settingsOrSize))
            return fetchApiEBS({
              volumeType: "#{vol_type}", 
              volumeSize: settingsOrSize, 
              region: sizeOrRegion, 
              storageType: "storage"
            })
          else
            return _EC2_EBS_FROM_SETTINGS({
              settings: settingsOrSize, 
              volumeType: "#{vol_type}", 
              storageType: "storage", 
              volumeSize: sizeOrRegion, 
              region
          });
        });
      }

      EOF
      f.write(func)
  end

#   // EBS IO1 storage
# function EC2_EBS_IO1_GB(settingsOrSize, sizeOrRegion, region) {
#   return analyticsWrapper(arguments, () => {
#     if(typeof settingsOrSize === "string" || typeof settingsOrSize === "number")
#       return fetchApiEBS({
#         volumeType: "io1", 
#         volumeSize: settingsOrSize, 
#         region: sizeOrRegion, 
#         storageType: "storage"
#       })
#     else
#       return _EC2_EBS_FROM_SETTINGS({
#         settings: settingsOrSize, 
#         volumeType: "io1", 
#         storageType: "storage", 
#         volumeSize: sizeOrRegion, 
#         region
#       })
#   });
# }

  f.close
end

def gen_rds(func_dir)
  outfilename = 'rds_gen.js'
  outfile = File.join(func_dir, outfilename)
  
  f = create_file(outfile)

  engines = {
      "AURORA_MYSQL" => "aurora/mysql",
      "AURORA_POSTGRESQL" => "aurora/postgresql",
      "MYSQL" => "mysql",
      "POSTGRESQL" => "postgresql",
      "MARIADB" => "mariadb"
  }

  engines.each do |engine|
    # /**
    #  * Returns the instance price for a #{engine[1]} RDS DB instance
    #  *
    #  * @param {A2:B7} settingsRange Two-column range of default EC2 instance settings
    #  * @param {"db.r4.xlarge"} instanceType Type of RDS instance
    #  * @param {"us-east-2"} region Override the region setting (optional)
    #  * @returns price
    #  * @customfunction
    #  */

    #   /**
    #   * Returns the on-demand instance price for a #{engine[1]} RDS DB instance
    #   *
    #   * @param {"db.r4.xlarge"} instanceType Type of RDS instance
    #   * @param {"us-east-2"} region AWS region of instance
    #   * @returns price
    #   * @customfunction
    #   */

    # /**
    # * Returns the reserved instance price for a #{engine[1]} RDS DB instance
    # *
    # * @param {"db.r4.xlarge"} instanceType Type of RDS instance
    # * @param {"us-east-2"} region AWS region of instance
    # * @param {1} purchaseTerm Duration of RI in years (1 or 3)
    # * @param {"all_upfront"} paymentOption Payment terms (no_upfront, partial_upfront, all_upfront)
    # * @returns price
    # * @customfunction
    # */
      func = <<~EOF
      function RDS_#{engine[0].upcase}(settingsRange, instanceType, region) {
        return analyticsWrapper(arguments, () => {
          return RDS_FROM_SETTINGS(settingsRange, "#{engine[1]}", instanceType, region)
        });
      }

      function RDS_#{engine[0].upcase}_OD(instanceType, region) {
        return analyticsWrapper(arguments, () => {
          return fetchApiRDS({ dbEngine: "#{engine[1]}", instanceType, region, purchaseType: "ondemand"});
        });
      }

      function RDS_#{engine[0].upcase}_RI(instanceType, region, purchaseTerm, paymentOption) {
        return analyticsWrapper(arguments, () => {
          // version 1 of AWS Pricing has purchaseTerm: 1 (instead of "1yr")
          return fetchApiRDS({ dbEngine: "#{engine[1]}", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm: purchaseTerm + "yr", paymentOption});
        });
      }

      EOF
      f.write(func)

      
      payment_options = {
          "no_upfront" => "no",
          "partial_upfront" => "partial",
          "all_upfront" => "all"
      }

      payment_options.each do |payment_option|
        # /**
        # * Returns the reserved instance price for a #{engine[1]} RDS DB instance with #{payment_option[0]} payment
        # *
        # * @param {"db.r4.xlarge"} instanceType Type of RDS instance
        # * @param {"us-east-2"} region AWS region of instance
        # * @param {1} purchaseTerm Duration of RI in years (1 or 3)
        # * @returns price
        # * @customfunction
        # */
          func = <<~EOF
          function RDS_#{engine[0].upcase}_RI_#{payment_option[1].upcase}(instanceType, region, purchaseTerm) {
            return analyticsWrapper(arguments, () => {
              // version 1 of AWS Pricing has purchaseTerm: 1 (instead of "1yr")
              return fetchApiRDS({ dbEngine: "#{engine[1]}", instanceType, region, purchaseType: 'reserved-instance', purchaseTerm: purchaseTerm + "yr", paymentOption: "#{payment_option[0]}"});
            });
          }

          EOF
          f.write(func)
      end
  end

  f.close
end

def gen_rds_storage(func_dir)
  outfilename = 'rds_storage_gen.js'
  outfile = File.join(func_dir, outfilename)

  f = create_file(outfile)

  voltypes = ["aurora", "gp2", "piops", "magnetic"]

  voltypes.each do |voltype|
    # /**
    #  * Returns the price of RDS storage for a #{voltype} volume type. Invoke as either:
    #  * (settingsRange, size[, region]) or (size, region).
    #  *
    #  * @param {A2:B7 or 4000} settingsOrSize Settings range or volume size
    #  * @param {4000 or "us-east-2"} sizeOrRegion Either a volume size or the region
    #  * @param {"us-east-2"} region AWS region (optional)
    #  * @returns price
    #  * @customfunction
    #  */
      func = <<~EOF
      function RDS_STORAGE_#{voltype.upcase}_GB(settingsOrSize, sizeOrRegion, region) {
        return analyticsWrapper(arguments, () => {
          if (typeof settingsOrSize === "string" || typeof settingsOrSize === "number") {
              return fetchApiRDSStorage({ storageType: "#{voltype}", storageSize: settingsOrSize, region: sizeOrRegion });
          } else {
              return RDS_STORAGE_FROM_SETTINGS({settings: settingsOrSize, storageType: "#{voltype}", storageSize: sizeOrRegion, region});
          }
        });
      }
      EOF
      f.write(func)
  end

  f.close
end

#
# MAIN
#

from = File.expand_path(File.dirname(__FILE__))
topdir = File.join(from, "..")

func_dir = File.join(topdir, 'src/functions/generated')

gen_ec2_ri(func_dir)
gen_ebs(func_dir)
gen_rds(func_dir)
gen_rds_storage(func_dir)
