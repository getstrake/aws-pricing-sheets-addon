const cfg = {
  baseHost: 'https://cdn.x.macroscope.io/aws-pricing/retro',
  hoursPerMonth: 730,
  logCustomFunctionToAnalytics: true,
  segment: {
    context: "Development",
    event: {
      PLUGIN_FORMULA_EXECUTE_CELL: "PLUGIN_FORMULA_EXECUTE_CELL",
      PLUGIN_EXECUTE_MENU: "PLUGIN_EXECUTE_MENU"
    }
  }
}