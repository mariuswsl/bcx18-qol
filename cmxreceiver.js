/*
NodeJS CMX Receiver

A basic web service to accept CMX data from a Cisco Meraki network
- Accept a GET request from Meraki and respond with a validator
- Meraki will POST to server, if validated.
- POST will contain a secret, which can be verified by the server.
- JSON data will be in the req.body.data. This will be available in the cmxData function's data object.

-- This skeleton app will only place the data received on the console. It's up to the developer to use this how ever required

*/

// CHANGE THESE CONFIGURATIONS to match your CMX configuration
var port = process.env.OVERRIDE_PORT || process.env.PORT || 1890;
var secret = process.env.SECRET || "testingSecret";
var validator = process.env.VALIDATOR || "9954e8cc03bbd5063df927a1e76925e09a40c032";
var route = process.env.ROUTE || "/cmx";

var path = require('path');

// All CMX JSON data will end up here. Send it to a database or whatever you fancy.
// data format specifications: https://documentation.meraki.com/MR/Monitoring_and_Reporting/CMX_Analytics#Version_2.0
function cmxData(data) {
    console.log("JSON Feeda: " + JSON.stringify(data.data, null, 2));
};


//**********************************************************

// Express Server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;


app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.json())


app.use(express.static(path.join(__dirname)));
app.use("/bower_components", express.static(__dirname + '/bower_components'));
app.use("/assets", express.static(__dirname + '/assets'));
app.use("/components", express.static(__dirname + '/components'));
app.use("/common", express.static(__dirname + '/scripts'));

app.use("/", express.static('app/' , { root : __dirname}));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // // Initialize the app.
  // var server = app.listen(process.env.PORT || 8080, function () {
  //   var port = server.address().port;
  //   console.log("App now running on port", port);
  // });


    // CMX Location Protocol, see https://documentation.meraki.com/MR/Monitoring_and_Reporting/CMX_Analytics#API_Configuration
    //
    // Meraki asks for us to know the secret
    app.get(route, function (req, res) {
        console.log("Validator = " + validator);
        res.status(200).send(validator);
    });
    //
    // Getting the flow of data every 1 to 2 minutes
    app.post(route, function (req, res) {
        if (req.body.secret == secret) {
            console.log("Secret verified");
            cmxData(req.body);
            db.listCollections().toArray(function(err, collInfos) {
                console.log('collInfos ', collInfos);
                // collInfos is an array of collection info objects that look like:
                // { name: 'test', options: {} }
            });
            db.collection('wifiDevices').insertOne(data, function(err, doc) {
                if (err) {
                  handleError(res, err.message, "Failed to create new contact.");
                } else {
                  res.status(201).json(doc.ops[0]);
                }
            });

        } else {
            console.log("Secret was invalid");
        }
        res.status(200);
    });


    app.get("/", function (req, res) {
        console.log("HERE");
        res.sendFile('app/index.html' , { root : __dirname});
    });







    app.get("/leo", function (req, res) {
        console.log("LEO GET");
        res.status(200).send('Hello Leo!');
    });

    app.post("/leo", function (req, res) {
        console.log("LEO POST");
        console.log("WITH BODY: ", req.body);
        res.status(200).send({});
    });




    // Start server
    app.listen(port, function () {
        console.log("CMX Receiver listening on port: " + port);
    });








});


