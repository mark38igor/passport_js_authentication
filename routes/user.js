const userController = require("../controller/UserController");
const express = require("express");

const userRouter = express.Router();

userRouter.get("/:flag?/create", (req, res, next) => {
  // if flag param set call test case to insert user
  if (req.params.flag) {
    userController.testCreateUser(req, res, next);
  }
});

userRouter.get("/signup", (req, res, next) => {
  res.render("signup.ejs");
});

userRouter.get("/signin", (req, res, next) => {
  res.render("signin.ejs");
});

module.exports = userRouter;
