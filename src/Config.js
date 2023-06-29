const cfg = {
  baseHost: 'https://cdn.x.macroscope.io/aws-pricing/retro/pricing/1.2',
  hoursPerMonth: 730,
  logCustomFunctionToAnalytics: false, // analytics, requires credentials, otherwise skips
  environment: "production", // should be either "development" or "production"
  segment: {
    event: {
      PLUGIN_FORMULA_EXECUTE_CELL: "PLUGIN_FORMULA_EXECUTE_CELL",
      PLUGIN_EXECUTE_MENU: "PLUGIN_EXECUTE_MENU"
    }
  },
  delimiter: ", ", // formula builder compare functionality, dividing multiple variables in formula argument
  baseNameForCompareResults: "Pricing", // formula builder compare functionality: sheet name for results will be pricing, pricing-1, pricing-2, etc.
}