const cfg = {
  baseHost: 'https://cdn.x.macroscope.io/aws-pricing/retro',
  hoursPerMonth: 730,
  logCustomFunctionToAnalytics: true,
  environment: "development", // should be either "development" or "production"
  segment: {
    event: {
      PLUGIN_FORMULA_EXECUTE_CELL: "PLUGIN_FORMULA_EXECUTE_CELL",
      PLUGIN_EXECUTE_MENU: "PLUGIN_EXECUTE_MENU"
    }
  }
}