const express = require("express");
const app = express();
const bodyParser = require("body-parser");

require("dotenv").config({ path: ".env" });

// Static folder public
app.use(express.static("public"));

// set the view engine to ejs
app.set("view engine", "ejs");

// parse requests of content-type: application/json
app.use(bodyParser.json());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// For passport
const session = require("express-session");

const passport = require("passport");

app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
const flash = require("connect-flash");
app.use(flash());
require("./utiils/passportLocal")(passport);

// Define Routes

// Test db connectivity working by creating a  User
const userRouter = require("./routes/user"); 
app.use("/user", userRouter);

app.use("/", userRouter);

// handle any routes with a 404 page
app.use("*", (req, res, next) => {
  res.render("404.ejs");
});

//Handle errors
const errorHandler = require("./utiils/errorhandler");
app.use((error, req, res, next) => {
  errorHandler(error, req, res, next);
});

//Listen server on specified port
app.listen(process.env.PORT, () =>
  console.log(`Authentication Server listening on ${process.env.PORT}`)
);
