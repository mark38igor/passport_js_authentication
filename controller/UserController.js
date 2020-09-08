const userModel = require("../model/UserModel");

let testCreateUser = async (req, res, next) => {
  try {
    let userData = {
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
    };
    console.log("User data controller", userData);
    let createUserResult = await userModel.createUser(userData);
    res.status(201).json(createUserResult);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  testCreateUser,
};
