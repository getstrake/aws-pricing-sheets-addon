## Installation

`git clone "url-to-github-repository-here"`  
`cd aws-pricing-v2`  
`npm install`   
// get credentials for analytics and hubspot  
// create a file with:  
```
const credentials = {
  api_secret_analytics: "YOUR_API_SECRET", // <= this is a clean account for testing named youtokserver
  measurement_id_analytics: "G-YOUR_ID", // <= this is a clean account for testing named youtokserver
  accessTokenHubSpot: "YOUR_ACCESS_TOKEN_HUBSPOT", // wim's test account
};
```  
  
// For Google Apps Script, it doesn't matter where you store the credentials, but I have them stored in path:
`"src/analytics/credentials/Credentials.js"`   

`npm install @google/clasp -g` // installs clasp cli globally   
`clasp --version` // check if it's installed  
`clasp login`  
`clasp create`  
// select sheets  
// open the spreadsheet url and script url in the browser  
`npm run deploy`  
// ? Manifest file has been updated. Do you want to push and overwrite? (y/N) // type y  
//   the deploy script creates generated functions  
//   and it generates the sidebar help_dialog.html  
//   it pushes all files to the script editor that is bound to that spreadsheet
// open the spreadsheet or script  
[Instructions: Publish on the marketplace and test add-on](https://developers.google.com/apps-script/add-ons/how-tos/publish-add-on-overview)