const userController = require("../controller/UserController");
const express = require("express");

const userRouter = express.Router();

userRouter.get("/:flag?/create", (req, res, next) => {
  // if flag param set call test case to insert user
  if (req.params.flag) {
    userController.testCreateUser(req, res, next);
  }
});

module.exports = userRouter;
