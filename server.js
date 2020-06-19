const fs = require('fs');

const express = require('express');
const hbs = require('hbs');         // handlebars view engine for express

const age = require('./age/age.js');

var app = express();

app.use((req, res, next) => {
  var requestTime = new Date().toString().substring(0,24);
  var requestMethod = req.method;
  var requestURL = req.url;

  var logMsg = `${requestTime}: ${requestMethod} ${requestURL}`;
  console.log(logMsg);
  fs.appendFile('server.log', logMsg + "\n", (err) => {
    if (err){
      console.log("Unable to append to server.log");
    }
  });

  next();
});

hbs.registerPartials(__dirname + "/views/partials");
app.set('view engine', 'hbs'); // once this is set, express automatically searches the "/views" folder for in the main file directory
app.use(express.static(__dirname + "/public"));

hbs.registerHelper('getFullYear', () => {
  return new Date().getFullYear();
  // return "test" to see how handlebars variables truly reference this when they are called inside of a handlebars template/view!
});

app.get("/about", (request, response) => { // think of get() method as HTTP GET request
  var pageTitle, interests, currentAge;
  pageTitle = "About me";
  interests = ["booty", "motorbikes", "travelling", "laughing", "friends"];

  var ageDecimal, ageYears, ageMonths;
  ageDecimal = age.getAgeDecimal("12 august 1998");
  ageYears = age.getAgeYears(ageDecimal);
  ageMonths = age.getAgeMonths(ageDecimal);
  currentAge = ageYears + " years and " + ageMonths + " months old.";

  var context = {
    pageTitle,  // (=== pageTitle: pageTitle)
    interests,  // (=== interests: interests)
    age: currentAge
  };

  response.render("about.hbs", context);
});

app.get('/contact', (req, res) => {

  var context = {
    pageTitle: "Contact Information",
  };

  res.render('contact.hbs', context);
});

app.listen(8000, () => {
  console.log("Server is up and running on port 8000.");
});
