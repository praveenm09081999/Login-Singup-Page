var express = require('express');  
var app = express();  
var bodyParser = require('body-parser');  
var  { response } = require('express');
var MongoClient = require('mongodb').MongoClient;
var mongoUrl = "mongodb+srv://praveenM:heartiin7341@cluster0.nr5bw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
var cors = require('cors');
// Create application/x-www-form-urlencoded parser  
app.use(express.static('public'));
app.use(cors({origin: 'http://localhost:8000'})); 
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
}) 
app.post('/process_post', function (req, res) { 
   // Prepare output in JSON format  
   response = {  
       email:req.body.email,  
       password:req.body.pass,
       type:req.body.type, 
       result:'' 
   };
   var emailFound = false
   MongoClient.connect(mongoUrl, function(err, db) {
    if (err) throw err;
    var dbo = db.db("hello_world");
    /*Return only the documents with the address "Park Lane 38":*/
    var query = { email: response.email};
    dbo.collection("stack_cross").find(query).toArray(function(err, result) {
      if (err) throw err;
      emailFound = true;
      console.log(result);
      db.close();
    });
  });
  if(response.type == 'register' && emailFound) {
    response.result = 'failed'
    throw 'email already exists'
  }
   if(response.type == 'login'){
      MongoClient.connect(mongoUrl, function(err, db) {
         if (err) throw err;
         var dbo = db.db("hello_world");
         /*Return only the documents with the address "Park Lane 38":*/
         var query = { email: response.email, password: response.password };
         dbo.collection("stack_cross").find(query).toArray(function(err, result) {
           if (err) throw err;
           response.result = result
           db.close();
         });
       });
   }if(response.type == 'register') {
      MongoClient.connect(mongoUrl, function(err, db) {
         if (err) throw err;
         var dbo = db.db("hello_world");
         var myobj = { email: response.email, password: response.password };
         dbo.collection("stack_cross").insertOne(myobj, function(err, res) {
           if (err) throw err;
           console.log("1 document inserted");
           response.result = res
           db.close();
         });
       });
   } 
   console.log(response); 
   res.write(JSON.stringify({message:'thank you'})) 
   res.end(JSON.stringify(response));  
})  
var server = app.listen(8000, function () {  
  var host = server.address().address  
  var port = server.address().port  
  console.log("Example app listening at http://%s:%s", host, port)  
})  