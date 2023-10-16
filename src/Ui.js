function onOpen(e) {
  SpreadsheetApp.getUi()
      .createAddonMenu()
      .addItem('How to use AWS Pricing', 'onboarding')
      .addItem('Formula Builder', 'showFormulaBuilder')
      .addSeparator()
      .addItem('Visit Strake’s website', 'openStrakeWebsite')
      .addItem('AWS Pricing on GitHub', 'openStrakeGithub')
      .addItem('Join our Slack Community', 'openSlackInvite')
      .addToUi();
}

/**
 * The onInstall(e) trigger runs automatically when a user installs an Editor add-on from within
 * Google Docs, Sheets, Slides, or Forms. The trigger won't run when a user installs the add-on
 * from the Google Workspace Marketplace website.
 *
 * @param {Event} e The onInstall event.
 * @see https://developers.google.com/apps-script/guides/triggers#oninstalle
 */
function onInstall(e) {
  onOpen(e);
  try { onboarding() } catch(err) { }
}

function showFormulaBuilder() {
  // const {email} = saveUserInformation();
  // const spreadsheetId = SpreadsheetApp.getActiveSpreadsheet().getId();
  
  // createHubSpotContact(email);
  // identifySegment(email, spreadsheetId);
  // trackSegmentEvent({
  //   userId: spreadsheetId, 
  //   eventKey: cfg.segment.event.PLUGIN_EXECUTE_MENU, 
  //   funcName: 'showFormulaBuilder'
  // })
  
  const ui = SpreadsheetApp.getUi();
  const template = HtmlService.createTemplateFromFile('formula_builder.html');
  template.delimiter = cfg.delimiter;
  template.optionsFromCDN = getOptionsForFormulaBuilder();
  const html = template.evaluate();
  html.setTitle('AWS Pricing Formula Builder');
  ui.showSidebar(html);
}

function getOptionsForFormulaBuilder() {
  // 'testing' path will be replaced by a path to the production folder
  return JSON.parse(UrlFetchApp.fetch('https://cdn.x.macroscope.io/aws-pricing/testing/formula_builder.json').getContentText());

  // below is an example of the data
  return {
    "ec2": {
      "features": {
        "platform": [
          "linux",
          "linux_enterprise",
          "linux_std",
          "linux_web",
          "rhel",
          "rhel-ha",
          "rhel-ha_enterprise",
          "rhel-ha_std",
          "rhel_enterprise",
          "rhel_std",
          "rhel_web",
          "suse",
          "ubuntu pro",
          "windows",
          "windows_enterprise",
          "windows_std",
          "windows_web"
        ],
        "instance_type": [
          "a1.2xlarge",
          "a1.4xlarge",
          "a1.large",
          "a1.medium",
          "a1.xlarge",
          "c1.medium",
          "c1.xlarge",
          "c3.2xlarge",
          "c3.4xlarge",
          "c3.8xlarge",
          "c3.large",
          "c3.xlarge",
          "c4.2xlarge",
          "c4.4xlarge",
          "c4.8xlarge",
          "c4.large",
          "c4.xlarge",
          "c5.12xlarge",
          "c5.18xlarge",
          "c5.24xlarge",
          "c5.2xlarge",
          "c5.4xlarge",
          "c5.9xlarge",
          "c5.large",
          "c5.xlarge",
          "c5a.12xlarge",
          "c5a.16xlarge",
          "c5a.24xlarge",
          "c5a.2xlarge",
          "c5a.4xlarge",
          "c5a.8xlarge",
          "c5a.large",
          "c5a.xlarge",
          "c5ad.12xlarge",
          "c5ad.16xlarge",
          "c5ad.24xlarge",
          "c5ad.2xlarge",
          "c5ad.4xlarge",
          "c5ad.8xlarge",
          "c5ad.large",
          "c5ad.xlarge",
          "c5d.12xlarge",
          "c5d.18xlarge",
          "c5d.24xlarge",
          "c5d.2xlarge",
          "c5d.4xlarge",
          "c5d.9xlarge",
          "c5d.large",
          "c5d.xlarge",
          "c5n.18xlarge",
          "c5n.2xlarge",
          "c5n.4xlarge",
          "c5n.9xlarge",
          "c5n.large",
          "c5n.xlarge",
          "c6a.12xlarge",
          "c6a.16xlarge",
          "c6a.24xlarge",
          "c6a.2xlarge",
          "c6a.32xlarge",
          "c6a.48xlarge",
          "c6a.4xlarge",
          "c6a.8xlarge",
          "c6a.large",
          "c6a.xlarge",
          "c6g.12xlarge",
          "c6g.16xlarge",
          "c6g.2xlarge",
          "c6g.4xlarge",
          "c6g.8xlarge",
          "c6g.large",
          "c6g.medium",
          "c6g.xlarge",
          "c6gd.12xlarge",
          "c6gd.16xlarge",
          "c6gd.2xlarge",
          "c6gd.4xlarge",
          "c6gd.8xlarge",
          "c6gd.large",
          "c6gd.medium",
          "c6gd.xlarge",
          "c6gn.12xlarge",
          "c6gn.16xlarge",
          "c6gn.2xlarge",
          "c6gn.4xlarge",
          "c6gn.8xlarge",
          "c6gn.large",
          "c6gn.medium",
          "c6gn.xlarge",
          "c6i.12xlarge",
          "c6i.16xlarge",
          "c6i.24xlarge",
          "c6i.2xlarge",
          "c6i.32xlarge",
          "c6i.4xlarge",
          "c6i.8xlarge",
          "c6i.large",
          "c6i.xlarge",
          "c6id.12xlarge",
          "c6id.16xlarge",
          "c6id.24xlarge",
          "c6id.2xlarge",
          "c6id.32xlarge",
          "c6id.4xlarge",
          "c6id.8xlarge",
          "c6id.large",
          "c6id.xlarge",
          "c6in.12xlarge",
          "c6in.16xlarge",
          "c6in.24xlarge",
          "c6in.2xlarge",
          "c6in.32xlarge",
          "c6in.4xlarge",
          "c6in.8xlarge",
          "c6in.large",
          "c6in.xlarge",
          "c7g.12xlarge",
          "c7g.16xlarge",
          "c7g.2xlarge",
          "c7g.4xlarge",
          "c7g.8xlarge",
          "c7g.large",
          "c7g.medium",
          "c7g.xlarge",
          "c7gd.12xlarge",
          "c7gd.16xlarge",
          "c7gd.2xlarge",
          "c7gd.4xlarge",
          "c7gd.8xlarge",
          "c7gd.large",
          "c7gd.medium",
          "c7gd.xlarge",
          "c7gn.12xlarge",
          "c7gn.16xlarge",
          "c7gn.2xlarge",
          "c7gn.4xlarge",
          "c7gn.8xlarge",
          "c7gn.large",
          "c7gn.medium",
          "c7gn.xlarge",
          "cc2.8xlarge",
          "cr1.8xlarge",
          "d2.2xlarge",
          "d2.4xlarge",
          "d2.8xlarge",
          "d2.xlarge",
          "d3.2xlarge",
          "d3.4xlarge",
          "d3.8xlarge",
          "d3.xlarge",
          "d3en.12xlarge",
          "d3en.2xlarge",
          "d3en.4xlarge",
          "d3en.6xlarge",
          "d3en.8xlarge",
          "d3en.xlarge",
          "dl1.24xlarge",
          "f1.16xlarge",
          "f1.2xlarge",
          "f1.4xlarge",
          "g2.2xlarge",
          "g2.8xlarge",
          "g3.16xlarge",
          "g3.4xlarge",
          "g3.8xlarge",
          "g3s.xlarge",
          "g4ad.16xlarge",
          "g4ad.2xlarge",
          "g4ad.4xlarge",
          "g4ad.8xlarge",
          "g4ad.xlarge",
          "g4dn.12xlarge",
          "g4dn.16xlarge",
          "g4dn.2xlarge",
          "g4dn.4xlarge",
          "g4dn.8xlarge",
          "g4dn.xlarge",
          "g5.12xlarge",
          "g5.16xlarge",
          "g5.24xlarge",
          "g5.2xlarge",
          "g5.48xlarge",
          "g5.4xlarge",
          "g5.8xlarge",
          "g5.xlarge",
          "g5g.16xlarge",
          "g5g.2xlarge",
          "g5g.4xlarge",
          "g5g.8xlarge",
          "g5g.xlarge",
          "h1.16xlarge",
          "h1.2xlarge",
          "h1.4xlarge",
          "h1.8xlarge",
          "hpc6a.48xlarge",
          "hpc6id.32xlarge",
          "hpc7a.12xlarge",
          "hpc7a.24xlarge",
          "hpc7a.48xlarge",
          "hpc7a.96xlarge",
          "hpc7g.16xlarge",
          "hpc7g.4xlarge",
          "hpc7g.8xlarge",
          "hs1.8xlarge",
          "i2.2xlarge",
          "i2.4xlarge",
          "i2.8xlarge",
          "i2.xlarge",
          "i3.16xlarge",
          "i3.2xlarge",
          "i3.4xlarge",
          "i3.8xlarge",
          "i3.large",
          "i3.xlarge",
          "i3en.12xlarge",
          "i3en.24xlarge",
          "i3en.2xlarge",
          "i3en.3xlarge",
          "i3en.6xlarge",
          "i3en.large",
          "i3en.xlarge",
          "i3p.16xlarge",
          "i4g.16xlarge",
          "i4g.2xlarge",
          "i4g.4xlarge",
          "i4g.8xlarge",
          "i4g.large",
          "i4g.xlarge",
          "i4i.16xlarge",
          "i4i.2xlarge",
          "i4i.32xlarge",
          "i4i.4xlarge",
          "i4i.8xlarge",
          "i4i.large",
          "i4i.xlarge",
          "im4gn.16xlarge",
          "im4gn.2xlarge",
          "im4gn.4xlarge",
          "im4gn.8xlarge",
          "im4gn.large",
          "im4gn.xlarge",
          "inf1.24xlarge",
          "inf1.2xlarge",
          "inf1.6xlarge",
          "inf1.xlarge",
          "inf2.24xlarge",
          "inf2.48xlarge",
          "inf2.8xlarge",
          "inf2.xlarge",
          "is4gen.2xlarge",
          "is4gen.4xlarge",
          "is4gen.8xlarge",
          "is4gen.large",
          "is4gen.medium",
          "is4gen.xlarge",
          "m1.large",
          "m1.medium",
          "m1.small",
          "m1.xlarge",
          "m2.2xlarge",
          "m2.4xlarge",
          "m2.xlarge",
          "m3.2xlarge",
          "m3.large",
          "m3.medium",
          "m3.xlarge",
          "m4.10xlarge",
          "m4.16xlarge",
          "m4.2xlarge",
          "m4.4xlarge",
          "m4.large",
          "m4.xlarge",
          "m5.12xlarge",
          "m5.16xlarge",
          "m5.24xlarge",
          "m5.2xlarge",
          "m5.4xlarge",
          "m5.8xlarge",
          "m5.large",
          "m5.xlarge",
          "m5a.12xlarge",
          "m5a.16xlarge",
          "m5a.24xlarge",
          "m5a.2xlarge",
          "m5a.4xlarge",
          "m5a.8xlarge",
          "m5a.large",
          "m5a.xlarge",
          "m5ad.12xlarge",
          "m5ad.16xlarge",
          "m5ad.24xlarge",
          "m5ad.2xlarge",
          "m5ad.4xlarge",
          "m5ad.8xlarge",
          "m5ad.large",
          "m5ad.xlarge",
          "m5d.12xlarge",
          "m5d.16xlarge",
          "m5d.24xlarge",
          "m5d.2xlarge",
          "m5d.4xlarge",
          "m5d.8xlarge",
          "m5d.large",
          "m5d.xlarge",
          "m5dn.12xlarge",
          "m5dn.16xlarge",
          "m5dn.24xlarge",
          "m5dn.2xlarge",
          "m5dn.4xlarge",
          "m5dn.8xlarge",
          "m5dn.large",
          "m5dn.xlarge",
          "m5n.12xlarge",
          "m5n.16xlarge",
          "m5n.24xlarge",
          "m5n.2xlarge",
          "m5n.4xlarge",
          "m5n.8xlarge",
          "m5n.large",
          "m5n.xlarge",
          "m5zn.12xlarge",
          "m5zn.2xlarge",
          "m5zn.3xlarge",
          "m5zn.6xlarge",
          "m5zn.large",
          "m5zn.xlarge",
          "m6a.12xlarge",
          "m6a.16xlarge",
          "m6a.24xlarge",
          "m6a.2xlarge",
          "m6a.32xlarge",
          "m6a.48xlarge",
          "m6a.4xlarge",
          "m6a.8xlarge",
          "m6a.large",
          "m6a.xlarge",
          "m6g.12xlarge",
          "m6g.16xlarge",
          "m6g.2xlarge",
          "m6g.4xlarge",
          "m6g.8xlarge",
          "m6g.large",
          "m6g.medium",
          "m6g.xlarge",
          "m6gd.12xlarge",
          "m6gd.16xlarge",
          "m6gd.2xlarge",
          "m6gd.4xlarge",
          "m6gd.8xlarge",
          "m6gd.large",
          "m6gd.medium",
          "m6gd.xlarge",
          "m6i.12xlarge",
          "m6i.16xlarge",
          "m6i.24xlarge",
          "m6i.2xlarge",
          "m6i.32xlarge",
          "m6i.4xlarge",
          "m6i.8xlarge",
          "m6i.large",
          "m6i.xlarge",
          "m6id.12xlarge",
          "m6id.16xlarge",
          "m6id.24xlarge",
          "m6id.2xlarge",
          "m6id.32xlarge",
          "m6id.4xlarge",
          "m6id.8xlarge",
          "m6id.large",
          "m6id.xlarge",
          "m6idn.12xlarge",
          "m6idn.16xlarge",
          "m6idn.24xlarge",
          "m6idn.2xlarge",
          "m6idn.32xlarge",
          "m6idn.4xlarge",
          "m6idn.8xlarge",
          "m6idn.large",
          "m6idn.xlarge",
          "m6in.12xlarge",
          "m6in.16xlarge",
          "m6in.24xlarge",
          "m6in.2xlarge",
          "m6in.32xlarge",
          "m6in.4xlarge",
          "m6in.8xlarge",
          "m6in.large",
          "m6in.xlarge",
          "m7a.12xlarge",
          "m7a.16xlarge",
          "m7a.24xlarge",
          "m7a.2xlarge",
          "m7a.32xlarge",
          "m7a.48xlarge",
          "m7a.4xlarge",
          "m7a.8xlarge",
          "m7a.large",
          "m7a.medium",
          "m7a.xlarge",
          "m7g.12xlarge",
          "m7g.16xlarge",
          "m7g.2xlarge",
          "m7g.4xlarge",
          "m7g.8xlarge",
          "m7g.large",
          "m7g.medium",
          "m7g.xlarge",
          "m7gd.12xlarge",
          "m7gd.16xlarge",
          "m7gd.2xlarge",
          "m7gd.4xlarge",
          "m7gd.8xlarge",
          "m7gd.large",
          "m7gd.medium",
          "m7gd.xlarge",
          "m7i-flex.2xlarge",
          "m7i-flex.4xlarge",
          "m7i-flex.8xlarge",
          "m7i-flex.large",
          "m7i-flex.xlarge",
          "m7i.12xlarge",
          "m7i.16xlarge",
          "m7i.24xlarge",
          "m7i.2xlarge",
          "m7i.48xlarge",
          "m7i.4xlarge",
          "m7i.8xlarge",
          "m7i.large",
          "m7i.xlarge",
          "p2.16xlarge",
          "p2.8xlarge",
          "p2.xlarge",
          "p3.16xlarge",
          "p3.2xlarge",
          "p3.8xlarge",
          "p3dn.24xlarge",
          "p4d.24xlarge",
          "p4de.24xlarge",
          "p5.48xlarge",
          "r3.2xlarge",
          "r3.4xlarge",
          "r3.8xlarge",
          "r3.large",
          "r3.xlarge",
          "r4.16xlarge",
          "r4.2xlarge",
          "r4.4xlarge",
          "r4.8xlarge",
          "r4.large",
          "r4.xlarge",
          "r5.12xlarge",
          "r5.16xlarge",
          "r5.24xlarge",
          "r5.2xlarge",
          "r5.4xlarge",
          "r5.8xlarge",
          "r5.large",
          "r5.xlarge",
          "r5a.12xlarge",
          "r5a.16xlarge",
          "r5a.24xlarge",
          "r5a.2xlarge",
          "r5a.4xlarge",
          "r5a.8xlarge",
          "r5a.large",
          "r5a.xlarge",
          "r5ad.12xlarge",
          "r5ad.16xlarge",
          "r5ad.24xlarge",
          "r5ad.2xlarge",
          "r5ad.4xlarge",
          "r5ad.8xlarge",
          "r5ad.large",
          "r5ad.xlarge",
          "r5b.12xlarge",
          "r5b.16xlarge",
          "r5b.24xlarge",
          "r5b.2xlarge",
          "r5b.4xlarge",
          "r5b.8xlarge",
          "r5b.large",
          "r5b.xlarge",
          "r5d.12xlarge",
          "r5d.16xlarge",
          "r5d.24xlarge",
          "r5d.2xlarge",
          "r5d.4xlarge",
          "r5d.8xlarge",
          "r5d.large",
          "r5d.xlarge",
          "r5dn.12xlarge",
          "r5dn.16xlarge",
          "r5dn.24xlarge",
          "r5dn.2xlarge",
          "r5dn.4xlarge",
          "r5dn.8xlarge",
          "r5dn.large",
          "r5dn.xlarge",
          "r5n.12xlarge",
          "r5n.16xlarge",
          "r5n.24xlarge",
          "r5n.2xlarge",
          "r5n.4xlarge",
          "r5n.8xlarge",
          "r5n.large",
          "r5n.xlarge",
          "r6a.12xlarge",
          "r6a.16xlarge",
          "r6a.24xlarge",
          "r6a.2xlarge",
          "r6a.32xlarge",
          "r6a.48xlarge",
          "r6a.4xlarge",
          "r6a.8xlarge",
          "r6a.large",
          "r6a.xlarge",
          "r6g.12xlarge",
          "r6g.16xlarge",
          "r6g.2xlarge",
          "r6g.4xlarge",
          "r6g.8xlarge",
          "r6g.large",
          "r6g.medium",
          "r6g.xlarge",
          "r6gd.12xlarge",
          "r6gd.16xlarge",
          "r6gd.2xlarge",
          "r6gd.4xlarge",
          "r6gd.8xlarge",
          "r6gd.large",
          "r6gd.medium",
          "r6gd.xlarge",
          "r6i.12xlarge",
          "r6i.16xlarge",
          "r6i.24xlarge",
          "r6i.2xlarge",
          "r6i.32xlarge",
          "r6i.4xlarge",
          "r6i.8xlarge",
          "r6i.large",
          "r6i.xlarge",
          "r6id.12xlarge",
          "r6id.16xlarge",
          "r6id.24xlarge",
          "r6id.2xlarge",
          "r6id.32xlarge",
          "r6id.4xlarge",
          "r6id.8xlarge",
          "r6id.large",
          "r6id.xlarge",
          "r6idn.12xlarge",
          "r6idn.16xlarge",
          "r6idn.24xlarge",
          "r6idn.2xlarge",
          "r6idn.32xlarge",
          "r6idn.4xlarge",
          "r6idn.8xlarge",
          "r6idn.large",
          "r6idn.xlarge",
          "r6in.12xlarge",
          "r6in.16xlarge",
          "r6in.24xlarge",
          "r6in.2xlarge",
          "r6in.32xlarge",
          "r6in.4xlarge",
          "r6in.8xlarge",
          "r6in.large",
          "r6in.xlarge",
          "r7g.12xlarge",
          "r7g.16xlarge",
          "r7g.2xlarge",
          "r7g.4xlarge",
          "r7g.8xlarge",
          "r7g.large",
          "r7g.medium",
          "r7g.xlarge",
          "r7gd.12xlarge",
          "r7gd.16xlarge",
          "r7gd.2xlarge",
          "r7gd.4xlarge",
          "r7gd.8xlarge",
          "r7gd.large",
          "r7gd.medium",
          "r7gd.xlarge",
          "r7iz.12xlarge",
          "r7iz.16xlarge",
          "r7iz.2xlarge",
          "r7iz.32xlarge",
          "r7iz.4xlarge",
          "r7iz.8xlarge",
          "r7iz.large",
          "r7iz.xlarge",
          "t1.micro",
          "t2.2xlarge",
          "t2.large",
          "t2.medium",
          "t2.micro",
          "t2.nano",
          "t2.small",
          "t2.xlarge",
          "t3.2xlarge",
          "t3.large",
          "t3.medium",
          "t3.micro",
          "t3.nano",
          "t3.small",
          "t3.xlarge",
          "t3a.2xlarge",
          "t3a.large",
          "t3a.medium",
          "t3a.micro",
          "t3a.nano",
          "t3a.small",
          "t3a.xlarge",
          "t4g.2xlarge",
          "t4g.large",
          "t4g.medium",
          "t4g.micro",
          "t4g.nano",
          "t4g.small",
          "t4g.xlarge",
          "trn1.2xlarge",
          "trn1.32xlarge",
          "trn1n.32xlarge",
          "u-12tb1.112xlarge",
          "u-18tb1.112xlarge",
          "u-24tb1.112xlarge",
          "u-3tb1.56xlarge",
          "u-6tb1.112xlarge",
          "u-6tb1.56xlarge",
          "u-9tb1.112xlarge",
          "vt1.24xlarge",
          "vt1.3xlarge",
          "vt1.6xlarge",
          "x1.16xlarge",
          "x1.32xlarge",
          "x1e.16xlarge",
          "x1e.2xlarge",
          "x1e.32xlarge",
          "x1e.4xlarge",
          "x1e.8xlarge",
          "x1e.xlarge",
          "x2gd.12xlarge",
          "x2gd.16xlarge",
          "x2gd.2xlarge",
          "x2gd.4xlarge",
          "x2gd.8xlarge",
          "x2gd.large",
          "x2gd.medium",
          "x2gd.xlarge",
          "x2idn.16xlarge",
          "x2idn.24xlarge",
          "x2idn.32xlarge",
          "x2iedn.16xlarge",
          "x2iedn.24xlarge",
          "x2iedn.2xlarge",
          "x2iedn.32xlarge",
          "x2iedn.4xlarge",
          "x2iedn.8xlarge",
          "x2iedn.xlarge",
          "x2iezn.12xlarge",
          "x2iezn.2xlarge",
          "x2iezn.4xlarge",
          "x2iezn.6xlarge",
          "x2iezn.8xlarge",
          "z1d.12xlarge",
          "z1d.2xlarge",
          "z1d.3xlarge",
          "z1d.6xlarge",
          "z1d.large",
          "z1d.xlarge"
        ],
        "region": [
          "af-south-1",
          "af-south-1-los-1",
          "ap-east-1",
          "ap-northeast-1",
          "ap-northeast-1-tpe-1",
          "ap-northeast-1-wl1-kix1",
          "ap-northeast-1-wl1-nrt1",
          "ap-northeast-2",
          "ap-northeast-2-wl1-cjj1",
          "ap-northeast-2-wl1-sel1",
          "ap-northeast-3",
          "ap-south-1",
          "ap-south-1-ccu-1",
          "ap-south-1-del-1",
          "ap-south-2",
          "ap-southeast-1",
          "ap-southeast-1-bkk-1",
          "ap-southeast-1-mnl-1",
          "ap-southeast-2",
          "ap-southeast-2-akl-1",
          "ap-southeast-2-per-1",
          "ap-southeast-3",
          "ap-southeast-4",
          "ca-central-1",
          "ca-central-1-wl1-yto1",
          "eu-central-1",
          "eu-central-1-ham-1",
          "eu-central-1-waw-1",
          "eu-central-1-wl1-ber1",
          "eu-central-1-wl1-dtm1",
          "eu-central-1-wl1-muc1",
          "eu-central-2",
          "eu-north-1",
          "eu-north-1-cph-1",
          "eu-north-1-hel-1",
          "eu-south-1",
          "eu-south-2",
          "eu-west-1",
          "eu-west-2",
          "eu-west-2-wl1-lon1",
          "eu-west-2-wl1-man1",
          "eu-west-3",
          "il-central-1",
          "me-central-1",
          "me-south-1",
          "me-south-1-mct-1",
          "sa-east-1",
          "us-east-1",
          "us-east-1-atl-1",
          "us-east-1-bos-1",
          "us-east-1-bue-1",
          "us-east-1-chi-1",
          "us-east-1-dfw-1",
          "us-east-1-iah-1",
          "us-east-1-lim-1",
          "us-east-1-mci-1",
          "us-east-1-mia-1",
          "us-east-1-msp-1",
          "us-east-1-nyc-1",
          "us-east-1-phl-1",
          "us-east-1-qro-1",
          "us-east-1-scl-1",
          "us-east-1-wl1",
          "us-east-1-wl1-atl1",
          "us-east-1-wl1-bna1",
          "us-east-1-wl1-chi1",
          "us-east-1-wl1-clt1",
          "us-east-1-wl1-dfw1",
          "us-east-1-wl1-dtw1",
          "us-east-1-wl1-iah1",
          "us-east-1-wl1-mia1",
          "us-east-1-wl1-msp1",
          "us-east-1-wl1-nyc1",
          "us-east-1-wl1-tpa1",
          "us-east-1-wl1-was1",
          "us-east-2",
          "us-gov-east-1",
          "us-gov-west-1",
          "us-west-1",
          "us-west-2",
          "us-west-2-den-1",
          "us-west-2-las-1",
          "us-west-2-lax-1",
          "us-west-2-pdx-1",
          "us-west-2-phx-1",
          "us-west-2-sea-1",
          "us-west-2-wl1",
          "us-west-2-wl1-den1",
          "us-west-2-wl1-las1",
          "us-west-2-wl1-lax1",
          "us-west-2-wl1-phx1",
          "us-west-2-wl1-sea1"
        ],
        "offering_class": [
          "convertible",
          "standard"
        ],
        "purchase_type": [
          "ondemand",
          "reserved"
        ],
        "purchase_term": [
          "1yr",
          "3yr"
        ],
        "payment_option": [
          "all_upfront",
          "no_upfront",
          "partial_upfront"
        ],
        "sql_license": [
          "enterprise",
          "no sql license",
          "std",
          "web"
        ]
      }
    },
    "ebs": {
      "features": {
        "region": [
          "af-south-1",
          "ap-east-1",
          "ap-northeast-1",
          "ap-northeast-2",
          "ap-northeast-3",
          "ap-south-1",
          "ap-south-2",
          "ap-southeast-1",
          "ap-southeast-2",
          "ap-southeast-3",
          "ap-southeast-4",
          "ca-central-1",
          "eu-central-1",
          "eu-central-2",
          "eu-north-1",
          "eu-south-1",
          "eu-south-2",
          "eu-west-1",
          "eu-west-2",
          "eu-west-3",
          "il-central-1",
          "me-central-1",
          "me-south-1",
          "sa-east-1",
          "us-east-1",
          "us-east-2",
          "us-gov-east-1",
          "us-gov-west-1",
          "us-west-1",
          "us-west-2",
          "us-west-2-lax-1"
        ],
        "storage_info": [
          {
            "storage_type": "iops",
            "volume_type": [
              "io1",
              "io2"
            ]
          },
          {
            "storage_type": "storage",
            "volume_type": [
              "gp2",
              "sc1",
              "st1",
              "gp3",
              "magnetic"
            ]
          },
          {
            "storage_type": "snapshot",
            "volume_type": []
          }
        ]
      }
    },
    "rds": {
      "features": {
        "database_engine": [
          "aurora/mysql",
          "aurora/postgresql",
          "mariadb",
          "mysql",
          "oracle",
          "postgresql",
          "sqlserver"
        ],
        "instance_type": [
          "db.m1.large",
          "db.m1.medium",
          "db.m1.small",
          "db.m1.xlarge",
          "db.m2.2xlarge",
          "db.m2.4xlarge",
          "db.m2.xlarge",
          "db.m3.2xlarge",
          "db.m3.large",
          "db.m3.medium",
          "db.m3.xlarge",
          "db.m4.10xlarge",
          "db.m4.16xlarge",
          "db.m4.2xlarge",
          "db.m4.4xlarge",
          "db.m4.large",
          "db.m4.xlarge",
          "db.m5.12xlarge",
          "db.m5.16xlarge",
          "db.m5.24xlarge",
          "db.m5.2xlarge",
          "db.m5.4xlarge",
          "db.m5.8xlarge",
          "db.m5.large",
          "db.m5.xlarge",
          "db.m5d.12xlarge",
          "db.m5d.16xlarge",
          "db.m5d.24xlarge",
          "db.m5d.2xlarge",
          "db.m5d.4xlarge",
          "db.m5d.8xlarge",
          "db.m5d.large",
          "db.m5d.xlarge",
          "db.m6g.12xlarge",
          "db.m6g.16xlarge",
          "db.m6g.2xlarge",
          "db.m6g.4xlarge",
          "db.m6g.8xlarge",
          "db.m6g.large",
          "db.m6g.xlarge",
          "db.m6gd.12xlarge",
          "db.m6gd.16xlarge",
          "db.m6gd.2xlarge",
          "db.m6gd.4xlarge",
          "db.m6gd.8xlarge",
          "db.m6gd.large",
          "db.m6gd.xlarge",
          "db.m6i.12xlarge",
          "db.m6i.16xlarge",
          "db.m6i.24xlarge",
          "db.m6i.2xlarge",
          "db.m6i.32xlarge",
          "db.m6i.4xlarge",
          "db.m6i.8xlarge",
          "db.m6i.large",
          "db.m6i.xlarge",
          "db.m7g.12xlarge",
          "db.m7g.16xlarge",
          "db.m7g.2xlarge",
          "db.m7g.4xlarge",
          "db.m7g.8xlarge",
          "db.m7g.large",
          "db.m7g.xlarge",
          "db.r3.2xlarge",
          "db.r3.4xlarge",
          "db.r3.8xlarge",
          "db.r3.large",
          "db.r3.xlarge",
          "db.r4.16xlarge",
          "db.r4.2xlarge",
          "db.r4.4xlarge",
          "db.r4.8xlarge",
          "db.r4.large",
          "db.r4.xlarge",
          "db.r5.12xlarge",
          "db.r5.12xlarge.tpc2.mem2x",
          "db.r5.16xlarge",
          "db.r5.24xlarge",
          "db.r5.2xlarge",
          "db.r5.2xlarge.tpc1.mem2x",
          "db.r5.2xlarge.tpc2.mem4x",
          "db.r5.2xlarge.tpc2.mem8x",
          "db.r5.4xlarge",
          "db.r5.4xlarge.tpc2.mem2x",
          "db.r5.4xlarge.tpc2.mem3x",
          "db.r5.4xlarge.tpc2.mem4x",
          "db.r5.6xlarge.tpc2.mem4x",
          "db.r5.8xlarge",
          "db.r5.8xlarge.tpc2.mem3x",
          "db.r5.large",
          "db.r5.large.tpc1.mem2x",
          "db.r5.xlarge",
          "db.r5.xlarge.tpc2.mem2x",
          "db.r5.xlarge.tpc2.mem4x",
          "db.r5b.12xlarge",
          "db.r5b.12xlarge.tpc2.mem2x",
          "db.r5b.16xlarge",
          "db.r5b.24xlarge",
          "db.r5b.2xlarge",
          "db.r5b.2xlarge.tpc1.mem2x",
          "db.r5b.2xlarge.tpc2.mem4x",
          "db.r5b.2xlarge.tpc2.mem8x",
          "db.r5b.4xlarge",
          "db.r5b.4xlarge.tpc2.mem2x",
          "db.r5b.4xlarge.tpc2.mem3x",
          "db.r5b.4xlarge.tpc2.mem4x",
          "db.r5b.6xlarge.tpc2.mem4x",
          "db.r5b.8xlarge",
          "db.r5b.8xlarge.tpc2.mem3x",
          "db.r5b.large",
          "db.r5b.large.tpc1.mem2x",
          "db.r5b.xlarge",
          "db.r5b.xlarge.tpc2.mem2x",
          "db.r5b.xlarge.tpc2.mem4x",
          "db.r5d.12xlarge",
          "db.r5d.16xlarge",
          "db.r5d.24xlarge",
          "db.r5d.2xlarge",
          "db.r5d.4xlarge",
          "db.r5d.8xlarge",
          "db.r5d.large",
          "db.r5d.xlarge",
          "db.r6g.12xlarge",
          "db.r6g.16xlarge",
          "db.r6g.2xlarge",
          "db.r6g.4xlarge",
          "db.r6g.8xlarge",
          "db.r6g.large",
          "db.r6g.xlarge",
          "db.r6gd.12xlarge",
          "db.r6gd.16xlarge",
          "db.r6gd.2xlarge",
          "db.r6gd.4xlarge",
          "db.r6gd.8xlarge",
          "db.r6gd.large",
          "db.r6gd.xlarge",
          "db.r6i.12xlarge",
          "db.r6i.16xlarge",
          "db.r6i.24xlarge",
          "db.r6i.2xlarge",
          "db.r6i.32xlarge",
          "db.r6i.4xlarge",
          "db.r6i.8xlarge",
          "db.r6i.large",
          "db.r6i.xlarge",
          "db.r7g.12xlarge",
          "db.r7g.16xlarge",
          "db.r7g.2xlarge",
          "db.r7g.4xlarge",
          "db.r7g.8xlarge",
          "db.r7g.large",
          "db.r7g.xlarge",
          "db.t1.micro",
          "db.t2.2xlarge",
          "db.t2.large",
          "db.t2.medium",
          "db.t2.micro",
          "db.t2.small",
          "db.t2.xlarge",
          "db.t3.2xlarge",
          "db.t3.large",
          "db.t3.medium",
          "db.t3.micro",
          "db.t3.small",
          "db.t3.xlarge",
          "db.t4g.2xlarge",
          "db.t4g.large",
          "db.t4g.medium",
          "db.t4g.micro",
          "db.t4g.small",
          "db.t4g.xlarge",
          "db.x1.16xlarge",
          "db.x1.32xlarge",
          "db.x1e.16xlarge",
          "db.x1e.2xlarge",
          "db.x1e.32xlarge",
          "db.x1e.4xlarge",
          "db.x1e.8xlarge",
          "db.x1e.xlarge",
          "db.x2g.12xlarge",
          "db.x2g.16xlarge",
          "db.x2g.2xlarge",
          "db.x2g.4xlarge",
          "db.x2g.8xlarge",
          "db.x2g.large",
          "db.x2g.xlarge",
          "db.x2idn.16xlarge",
          "db.x2idn.24xlarge",
          "db.x2idn.32xlarge",
          "db.x2iedn.16xlarge",
          "db.x2iedn.24xlarge",
          "db.x2iedn.2xlarge",
          "db.x2iedn.32xlarge",
          "db.x2iedn.4xlarge",
          "db.x2iedn.8xlarge",
          "db.x2iedn.xlarge",
          "db.x2iezn.12xlarge",
          "db.x2iezn.2xlarge",
          "db.x2iezn.4xlarge",
          "db.x2iezn.6xlarge",
          "db.x2iezn.8xlarge",
          "db.z1d.12xlarge",
          "db.z1d.2xlarge",
          "db.z1d.3xlarge",
          "db.z1d.6xlarge",
          "db.z1d.large",
          "db.z1d.xlarge"
        ],
        "region": [
          "af-south-1",
          "ap-east-1",
          "ap-northeast-1",
          "ap-northeast-2",
          "ap-northeast-3",
          "ap-south-1",
          "ap-south-2",
          "ap-southeast-1",
          "ap-southeast-2",
          "ap-southeast-3",
          "ap-southeast-4",
          "ca-central-1",
          "eu-central-1",
          "eu-central-2",
          "eu-north-1",
          "eu-south-1",
          "eu-south-2",
          "eu-west-1",
          "eu-west-2",
          "eu-west-3",
          "il-central-1",
          "me-central-1",
          "me-south-1",
          "sa-east-1",
          "us-east-1",
          "us-east-2",
          "us-gov-east-1",
          "us-gov-west-1",
          "us-west-1",
          "us-west-2",
          "us-west-2-lax-1"
        ],
        "offering_class": [
          "standard"
        ],
        "purchase_type": [
          "ondemand",
          "reserved"
        ],
        "purchase_term": [
          "1yr",
          "3yr"
        ],
        "payment_option": [
          "all_upfront",
          "no_upfront",
          "partial_upfront"
        ]
      }
    },
    "rds_storage": {
      "features": {
        "storage_type": [
          "aurora",
          "gp2",
          "gp3",
          "piops"
        ],
        "region": [
          "af-south-1",
          "ap-east-1",
          "ap-northeast-1",
          "ap-northeast-2",
          "ap-northeast-3",
          "ap-south-1",
          "ap-south-2",
          "ap-southeast-1",
          "ap-southeast-2",
          "ap-southeast-3",
          "ap-southeast-4",
          "ca-central-1",
          "eu-central-1",
          "eu-central-2",
          "eu-north-1",
          "eu-south-1",
          "eu-south-2",
          "eu-west-1",
          "eu-west-2",
          "eu-west-3",
          "il-central-1",
          "me-central-1",
          "me-south-1",
          "sa-east-1",
          "us-east-1",
          "us-east-2",
          "us-gov-east-1",
          "us-gov-west-1",
          "us-west-1",
          "us-west-2"
        ]
      }
    }
  };
}

function insertFormula(formula, args, argumentNames) {
  if(!formula) throw "Should send formula as argument";
  if(args.join("").includes(cfg.delimiter))
    return insertFormulaWithCompare(formula, args, argumentNames);
  const activeSheet = SpreadsheetApp.getActiveSheet();
  const activeRange = activeSheet.getActiveRange();
  const cell = activeSheet.getRange(activeRange.getRow(),activeRange.getColumn())
  const cellName = cell.getA1Notation();
  cell.setValue('=' + formula);
  SpreadsheetApp.getActiveSpreadsheet().toast(`Formula is inserted into cell ${cellName}. To undo this, click on the sheet and press Ctrl+Z`)
}

function insertFormulaWithCompare(formula, args, argumentNames) {
  const functionName = formula.match(/[^(]+/)[0];
  const newSheetName = createNewSheetName(cfg.baseNameForCompareResults);
  const compareSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet(newSheetName);

  const showOnlyColumnsWithComparedValues = false; 
  // When set to false, every parameter of the formula will be displayed in a separate column.
  // You can later change this to true to only show columns that contain compared values.
  // In this case, the remaining parameters will be hardcoded in the formula, appearing only in the last column labeled 'Price'.
  // For instance: AWS_RDS_STORAGE(A2, 4000, "us-east-1") where A2 refers to column A with compared values and "us-east-1" is hardcoded

  const values = prepareValues(functionName, args, argumentNames, showOnlyColumnsWithComparedValues);
  SpreadsheetApp.getActiveSpreadsheet().toast(`Please wait while "${newSheetName}" is being populated. This may take a few seconds. It will contain ${values.length - 1} formulas.`);
  
  compareSheet.clear();
  compareSheet.getRange(1, 1, values.length, values[0].length).setValues(values);
  
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  spreadsheet.setActiveSheet(compareSheet);
  resizeColumnsAndStylizeSheet(compareSheet);
}

function resizeColumnsAndStylizeSheet(sheet) {
  const firstRow = sheet.getRange('1:1');
  autoResizeColumnsWithPadding();
  sheet.setFrozenRows(1);
  firstRow.setFontWeight('bold');
}

// generates a new sheet name: baseName, then baseName-1, then baseName-2, etc.
function createNewSheetName(baseName) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = spreadsheet.getSheets();
  const sheetNames = sheets.map(x => x.getName());

  let count = 1;
  let newSheetName = baseName;
  while (sheetNames.includes(newSheetName)) {
    newSheetName = `${baseName}-${count}`;
    count++;
  }

  return newSheetName;
}

function getHeadersAndIndicesFromFormulaArguments(args, argumentNames, showOnlyColumnsWithComparedValues = false) {
  let headers = [], indices = [], argumentNamesThatHaveCompareInIt = [];
  for(const [index, arg] of args.entries()) {
    if(showOnlyColumnsWithComparedValues) {
      if(typeof arg === "string" && arg.includes(cfg.delimiter)) {
        indices.push(index);
        headers.push(arg.split(cfg.delimiter));
        argumentNamesThatHaveCompareInIt.push(argumentNames[index]);
      } 
    } else { // show all columns
      indices.push(index);
      if(typeof arg === "string" && arg.includes(cfg.delimiter)) {
        headers.push(arg.split(cfg.delimiter));
        argumentNamesThatHaveCompareInIt.push(argumentNames[index]);
      } else {
        headers.push([arg]);
      }
    }
  }
  return {headers, indices, argumentNamesThatHaveCompareInIt};
}

function prepareValues(functionName, args, argumentNames, showOnlyColumnsWithComparedValues) {
  const {headers, indices, argumentNamesThatHaveCompareInIt} = getHeadersAndIndicesFromFormulaArguments(args, argumentNames, showOnlyColumnsWithComparedValues);
  if(headers.length < 1) {
    throw new Error("At least one header must be present");
  }
  
  const header = headers.map((_, i) => argumentNames[indices[i]]).concat("price");
  const values = [header];
  const combinations = cartesianProduct(headers);
  let row = [];
  
  combinations.forEach(combination => {
    const rowHasEC2OnDemand = functionName === "AWS_EC2" &&
                              argumentNames.includes("purchaseType") &&
                              combination[argumentNames.indexOf("purchaseType")] === "ondemand";

    const rowHasRDSOnDemand = functionName === "AWS_RDS" &&
                              argumentNames.includes("purchaseType") &&
                              combination[argumentNames.indexOf("purchaseType")] === "ondemand";

    const rowHasRedshiftOnDemand = functionName === "AWS_Redshift" &&
                              argumentNames.includes("purchaseType") &&
                              combination[argumentNames.indexOf("purchaseType")] === "ondemand";

    const slicedArgs = rowHasRedshiftOnDemand ? args.slice(0,3) : ((rowHasEC2OnDemand || rowHasRDSOnDemand) ? args.slice(0,4) : args);
    const formula = `=${functionName}(${replaceCellReference(slicedArgs, values.length + 1, indices).join(",")})`;
                      
    if(rowHasEC2OnDemand || rowHasRDSOnDemand || rowHasRedshiftOnDemand) {
      // Special case: on-demand vs reserved instances
      // Fill unnecessary arguments with "-"

      if(rowHasEC2OnDemand) {
        const EC2_RESERVED_INSTANCE_ARGS = ["offeringClass", "purchaseTerm", "paymentOption", "sqlLicense"];
        row = [...combination, formula].map((value, index) => 
          EC2_RESERVED_INSTANCE_ARGS.includes(argumentNames[indices[index]]) ? "-" : value
        )
      } else if(rowHasRDSOnDemand || rowHasRedshiftOnDemand) {
        const RDS_RESERVED_INSTANCE_ARGS = ["purchaseTerm", "paymentOption"];
        row = [...combination, formula].map((value, index) => 
          RDS_RESERVED_INSTANCE_ARGS.includes(argumentNames[indices[index]]) ? "-" : value
        )
      }
      duplicateRow = isDuplicateRowExceptLastColumn(values, row);
      if(duplicateRow) {
        return; // skip this row
      }
    } else {
      row = [...combination, formula];
    }

    values.push(row);
  });
  return values;
}

// because last cell has a formula with a cell reference in it, we can't compare it
function isDuplicateRowExceptLastColumn(values, row) {
  concatRowWithoutLastCell = cells => cells.slice(0,-1).join("");
  const flatRows = values.map(concatRowWithoutLastCell);
  return flatRows.includes(concatRowWithoutLastCell(row)); 
}

function replaceCellReference(args, row, indices) {
  return args.map((value, index) => {
    const columnIndex = indices.indexOf(index);
    return columnIndex !== -1 ?
      indexToColumnLetter(columnIndex) + row :
      `"${value}"`;
  })
}

function indexToColumnLetter(n) {
  var ordA = 'a'.charCodeAt(0);
  var ordZ = 'z'.charCodeAt(0);
  var len = ordZ - ordA + 1;

  var s = "";
  while(n >= 0) {
      s = String.fromCharCode(n % len + ordA) + s;
      n = Math.floor(n / len) - 1;
  }
  return s;
}

// Helper function to generate cartesian product of input arrays
function cartesianProduct(arrays) {
  return arrays.reduce((a, b) =>
    a.map(x => b.map(y => [...x, y])).reduce((a, b) => a.concat(b), []), [[]]
  );
}

function autoResizeColumnsWithPadding() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lastColumn = sheet.getLastColumn();
  sheet.autoResizeColumns(1, sheet.getLastColumn());

  for (var i = 1; i <= lastColumn; i++) {
    var columnWidth = sheet.getColumnWidth(i);
    sheet.setColumnWidth(i, columnWidth + 10);
  }
}

function onboarding() {
  const {email} = saveUserInformation();
  const spreadsheetId = SpreadsheetApp.getActiveSpreadsheet().getId();
  
  createHubSpotContact(email);
  identifySegment(email, spreadsheetId);
  trackSegmentEvent({
    userId: spreadsheetId, 
    eventKey: cfg.segment.event.PLUGIN_EXECUTE_MENU, 
    funcName: 'onboarding'
  })
  
  const ui = SpreadsheetApp.getUi();
  const template = HtmlService.createTemplateFromFile('help_dialog_collapsed.html');
  const html = template.evaluate();
  html.setTitle('AWS Pricing Add-on');
  ui.showSidebar(html);
}

function openStrakeWebsite() {
  openUrl('https://www.getstrake.com');
}

function openStrakeGithub() {
  openUrl('https://www.github.com/getmacroscope');
}

function openSlackInvite() {
  openUrl('https://strake-community.slack.com/join/shared_invite/zt-1nisfazzn-uO5O_I28Z7N6sZ6iM2H1xA');
}

function openUrl( url ){
  var html = HtmlService.createHtmlOutput('<!DOCTYPE html><html><script>'
  +'window.close = function(){window.setTimeout(function(){google.script.host.close()},9)};'
  +'var a = document.createElement("a"); a.href="'+url+'"; a.target="_blank";'
  +'if(document.createEvent){'
  +'  var event=document.createEvent("MouseEvents");'
  +'  if(navigator.userAgent.toLowerCase().indexOf("firefox")>-1){window.document.body.append(a)}'                          
  +'  event.initEvent("click",true,true); a.dispatchEvent(event);'
  +'}else{ a.click() }'
  +'close();'
  +'</script>'
  // Offer URL as clickable link in case above code fails.
  +'<body style="word-break:break-word;font-family:sans-serif;">Failed to open automatically.  Click below:<br/><a href="'+url+'" target="_blank" onclick="window.close()">Click here to proceed</a>.</body>'
  +'<script>google.script.host.setHeight(55);google.script.host.setWidth(410)</script>'
  +'</html>')
  .setWidth( 90 ).setHeight( 1 );
  SpreadsheetApp.getUi().showModalDialog( html, "Opening ..." );
}

function buildSideBar() {
  try {
    const {email} = saveUserInformation();
    createHubSpotContact(email);
  } catch(err) {}

  const base64screenshot = `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`;

  var image = CardService.newImage()
    .setAltText("How to use this extension")
    .setImageUrl("data:image/png;base64," + base64screenshot);

  return CardService.newCardBuilder()
      .setName("AWS Pricing")
      .setHeader(CardService.newCardHeader().setTitle("Click on menu Extensions and then click on AWS Pricing Add-on"))
      .addSection(CardService.newCardSection().addWidget(image))
      .build();
}