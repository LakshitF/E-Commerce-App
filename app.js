//Order matters ! It does--> A LOT!
const ORIG = process.env.ORIG || "http://localhost:8000";
const fs = require("fs");
const express = require("express");
const app = express(); // new convention
const shop = require("./shop"); // adds all the included routes
const login = require("./login");
const bodyParser = require("body-parser");
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const User = require("./models/user");
const cors = require("cors");
const session = require("express-session");
app.use(cors({ credentials: true, origin: ORIG }));
const mongostore = require("connect-mongodb-session")(session);
const murl = "mongodb+srv://ray:ray@cluster0-uzqum.mongodb.net/shop"; //removed retry
const flash = require("connect-flash");
app.use(flash()); //use this middleware anywhere in this app
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "static"))); //allows all files inside static folder to be linked using href

const PORT = process.env.PORT || 3000;
//"server": "nodemon --ignore './client/*' app.js ",
const store = new mongostore({
  uri: murl,
  collection: "sessions"
});

app.use(
  session({
    secret: "topsecret",
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use((req, res, next) => {
  if (!req.session) {
    return next();
  }
  if (!req.session.user) {
    //if it is not created yet, just dont execute this route: Very important
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      return next();
    })
    .catch(err => {
      console.log(err);
      return next();
    });
}); //It's important to keep this above the other urls
//as it is going to be used for other routes

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", ORIG); //header is used to set mulitple headers
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(login);
app.use(shop);

// app.use(express.static(path.join(__dirname, "client", "build")));
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });

mongoose
  .connect(
    "mongodb+srv://ray:ray@cluster0-uzqum.mongodb.net/shop?retryWrites=tr",
    { useNewUrlParser: true }
  )
  .then(result => {
    const server = app.listen(PORT);
    console.log("DB connected");
  })
  .catch(err => {
    console.log(err);
  });
