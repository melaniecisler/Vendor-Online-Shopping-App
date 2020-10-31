require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var passport = require("./config/passport")
var session = require("express-session");
var Handlebars = require('handlebars');
var {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');



const path = require('path')



var db = require("./models");

var app = express();
//new
//if (process.env.JAWSDB_URL) {
 // var connection = mysql.createConnection(process.env.JAWSDB_URL)
//} else {
  //var connection = mysql.createConnection({
  //  host: 'localhost',
 //   user: 'root',
  //  password: 'TitoBurrito1!',
  //  database: 'storedb'
 // }); 
//} //end of new 

var PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize()); 
app.use(passport.session());




// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars)
    
  })
);
app.set('views', path.join(__dirname, 'views'))
app.set("view engine", "handlebars");


// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
require("./routes/product-api-routes")(app);
require("./routes/post-api-routes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
