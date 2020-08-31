const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const docusign = require('docusign-esign')
    , fs = require('fs')
    , process = require('process')
    , basePath = 'https://demo.docusign.net/restapi'
    , envir = process.env
    ;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//Send email request
app.get('/first', async function sendEnvelopeController (req, res) {
    const qp =req.query;
    // Fill in these constants or use query parameters of ACCESS_TOKEN, ACCOUNT_ID, USER_FULLNAME, USER_EMAIL
    // or environment variables.
  
    // Obtain an OAuth token from https://developers.docusign.com/oauth-token-generator
    const accessToken = envir.ACCESS_TOKEN || qp.ACCESS_TOKEN || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjY4MTg1ZmYxLTRlNTEtNGNlOS1hZjFjLTY4OTgxMjIwMzMxNyJ9.eyJUb2tlblR5cGUiOjUsIklzc3VlSW5zdGFudCI6MTU5ODg5NDg4MywiZXhwIjoxNTk4OTIzNjgzLCJVc2VySWQiOiIwNjFjNjMzMC0zNzYwLTRlZmItOTZiMC0zYTFmMjVlOWE5OTYiLCJzaXRlaWQiOjEsInNjcCI6WyJzaWduYXR1cmUiLCJjbGljay5tYW5hZ2UiLCJvcmdhbml6YXRpb25fcmVhZCIsInJvb21fZm9ybXMiLCJncm91cF9yZWFkIiwicGVybWlzc2lvbl9yZWFkIiwidXNlcl9yZWFkIiwidXNlcl93cml0ZSIsImFjY291bnRfcmVhZCIsImRvbWFpbl9yZWFkIiwiaWRlbnRpdHlfcHJvdmlkZXJfcmVhZCIsImR0ci5yb29tcy5yZWFkIiwiZHRyLnJvb21zLndyaXRlIiwiZHRyLmRvY3VtZW50cy5yZWFkIiwiZHRyLmRvY3VtZW50cy53cml0ZSIsImR0ci5wcm9maWxlLnJlYWQiLCJkdHIucHJvZmlsZS53cml0ZSIsImR0ci5jb21wYW55LnJlYWQiLCJkdHIuY29tcGFueS53cml0ZSJdLCJhdWQiOiJmMGYyN2YwZS04NTdkLTRhNzEtYTRkYS0zMmNlY2FlM2E5NzgiLCJhenAiOiJmMGYyN2YwZS04NTdkLTRhNzEtYTRkYS0zMmNlY2FlM2E5NzgiLCJpc3MiOiJodHRwczovL2FjY291bnQtZC5kb2N1c2lnbi5jb20vIiwic3ViIjoiMDYxYzYzMzAtMzc2MC00ZWZiLTk2YjAtM2ExZjI1ZTlhOTk2IiwiYW1yIjpbImludGVyYWN0aXZlIl0sImF1dGhfdGltZSI6MTU5ODg5NDg4MSwicHdpZCI6Ijk1ZmUwZWU4LWJlN2UtNGRkNy1hZWNiLWVjOTFhZmU3YzI5NiJ9.ADHJgNOZOHbx8phKdkKvHl7njq6eYhHBxB3tRHjTFCdoMMx5bhLRkGHaQbIf__8vkGTogX0Ewys2-v2jhXwUJi7OVynRMweYLgIg0jNMgr0PkQohRvqmOzidi6gn2wq7VzdBrgZEWUQwW1Fz0ysIYxU642I0mDmnbMysQ0e4hknUJ_FrmxYZBdmTcqU_HKuJEyOgmCtte3wvjKZni_jfpDuHpfAhJwl1HBmgh-N6EPFatzka1CnXvuisdVeUJjYflRINcJeFmw85fiAZzO15A6exTdzzspMXpYAO08JzuSQc9_DuhDbOTW52PtItqV5ZoydwqK-mCX2RqatmGkihMA';
  
    // Obtain your accountId from demo.docusign.com -- the account id is shown in the drop down on the
    // upper right corner of the screen by your picture or the default picture. 
    const accountId = envir.ACCOUNT_ID || qp.ACCOUNT_ID || '11351262'; 
  
    // Recipient Information:
    const signerName = envir.USER_FULLNAME || qp.USER_FULLNAME || 'Benjamin Liu';
    const signerEmail = envir.USER_EMAIL || qp.USER_EMAIL || 'benliu2001@yahoo.com';
  
    // The document you wish to send. Path is relative to the root directory of this repo.
    const fileName = 'demo_documents/World_Wide_Corp_lorem.pdf';
  
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
  
    /**
     *  The envelope is sent to the provided email address. 
     *  One signHere tab is added.
     *  The document path supplied is relative to the working directory 
     */
  
  
     
    // API CLIENT
    const apiClient = new docusign.ApiClient();
    apiClient.setBasePath(basePath);
    apiClient.addDefaultHeader('Authorization', 'Bearer ' + accessToken);
    // Set the DocuSign SDK components to use the apiClient object
    docusign.Configuration.default.setDefaultApiClient(apiClient);
    
  
  
  
    
    // EMAIL SPECIFICATION + DEFINITION
    // Create the envelope request
    // Start with the request object
    const envDef = new docusign.EnvelopeDefinition();
    //Set the Email Subject line and email message
    envDef.emailSubject = 'Please sign this document sent from the Node example';
    envDef.emailBlurb = 'Please sign this document sent from the Node example.'
  
  
  
  
  
    // FILE => Base64, Place Document Request Object in Array
  
    // Read the file from the document and convert it to a Base64String
    const pdfBytes = fs.readFileSync(path.resolve(__dirname, fileName))
        , pdfBase64 = pdfBytes.toString('base64');
    
    // Create the document request object
    const doc = docusign.Document.constructFromObject({documentBase64: pdfBase64,
          fileExtension: 'pdf',  // You can send other types of documents too.
          name: 'Sample document', documentId: '1'});
  
    // Create a documents object array for the envelope definition and add the doc object
    envDef.documents = [doc];
  
  
  
  
  
    // SIGNER + SIGN HERE Object Creation || Integrate Sign Here with Signer Object
  
    // Create the signer object with the previously provided name / email address
    const signer = docusign.Signer.constructFromObject({name: signerName,
          email: signerEmail, routingOrder: '1', recipientId: '1'});
  
    // Create the signHere tab to be placed on the envelope
    const signHere = docusign.SignHere.constructFromObject({documentId: '1',
          pageNumber: '1', recipientId: '1', tabLabel: 'SignHereTab',
          xPosition: '195', yPosition: '147'});
  
    // Create the overall tabs object for the signer and add the signHere tabs array
    // Note that tabs are relative to receipients/signers.
    signer.tabs = docusign.Tabs.constructFromObject({signHereTabs: [signHere]});
  
    // Add the recipients object to the envelope definition.
    // It includes an array of the signer objects. 
    envDef.recipients = docusign.Recipients.constructFromObject({signers: [signer]});
    // Set the Envelope status. For drafts, use 'created' To send the envelope right away, use 'sent'
    envDef.status = 'sent';
  
  
  
    //SEND ENVELOPE
  
    // Send the envelope
    let envelopesApi = new docusign.EnvelopesApi()
      , results
      ;
  
    try {
      results = await envelopesApi.createEnvelope(accountId, {'envelopeDefinition': envDef})
    } catch  (e) {
      let body = e.response && e.response.body;
      if (body) {
        // DocuSign API exception
        res.send (`<html lang="en"><body>
                    <h3>API problem</h3><p>Status code ${e.response.status}</p>
                    <p>Error message:</p><p><pre><code>${JSON.stringify(body, null, 4)}</code></pre></p>`);
      } else {
        // Not a DocuSign exception
        throw e;
      }
    }
    // Envelope has been created:
    if (results) {
      console.log(JSON.stringify(results, null, 4));
      res.send (`<html lang="en"><body>
                  <h3>Envelope Created!</h3>
                  <p>Signer: ${signerName} &lt;${signerEmail}&gt;</p>
                  <p>Results</p><p><pre><code>${JSON.stringify(results, null, 4)}</code></pre></p>`);
    }
});

//Send bulk emails
app.get('/second', function(req, res) {
    res.send("second responde successful");
});

//Retrieve and store bulk documents
app.get('/third', function(req, res) {
    res.send("Third response successful");
});

app.listen(process.env.PORT || 8080);