const express = require("express");
const app = express();
const bodyParser = require("body-parser");

require("dotenv").config({ path: ".env" });

// parse requests of content-type: application/json
app.use(bodyParser.json());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Define Routes

// Test db connectivity working by creating a  User
const userRouter = require("./routes/user");
app.use("/user", userRouter);

//Handle errors
const errorHandler = require("./utiils/errorhandler");
app.use((error, req, res, next) => {
  errorHandler(error, req, res, next);
});

//Listen server on specified port
app.listen(process.env.PORT, () =>
  console.log(`Authentication Server listening on ${process.env.PORT}`)
);
