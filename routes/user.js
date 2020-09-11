const passport = require("passport");
const userController = require("../controller/UserController");
const express = require("express");
const userRouter = express.Router();

userRouter.post("/:flag?/create", (req, res, next) => {
  // if flag param set call test case to insert user
  if (req.params.flag) {
    userController.testCreateUser(req, res, next);
  }
});

userRouter.get("/signup", (req, res, next) => {
  res.render("signup.ejs");
});
userRouter.post(
  "/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/signin",
    failureRedirect: "/user/error",
    failureFlash : true
  })
);

userRouter.get("/signin", (req, res, next) => {
  res.render("signin.ejs");
});

userRouter.post(
  "/signin",
  passport.authenticate("local-signin", {
    successRedirect: "/home",
    failureRedirect: "/user/error",
    failureFlash : true
  })
);

userRouter.get("/error", (req, res, next) => {
  let error = { message: req.flash("error")};
  // console.log("Error", error);
  res.render("error.ejs",error);
});

module.exports = userRouter;
