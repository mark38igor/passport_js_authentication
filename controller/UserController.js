const userModel = require("../model/UserModel");
const passwordUtils = require("../utiils/password");

let testCreateUser = async (req, res, next) => {
  try {
    let userData = {
      email: req.body.email,
      name: req.body.name,
      password: await passwordUtils.encryptPassword(req.body.password),
    };
    console.log("User data controller", userData);
    let createUserResult = await userModel.createUser(userData);
    res.status(201).json(createUserResult);
  } catch (error) {
    next(error);
  }
};

let checkUserExist = async (email, cb) => {
  try {
    let result = await userModel.getInfo(email);
    console.log("Result", result);
    cb(result.length > 0 ? true : false);
  } catch (error) {
    cb(error);
  }
};
let checkValidPassword = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let valid = await passwordUtils.validatePassword(email, password);
      if (!valid) {
        let error = new Error();
        error.message = "Password is invalid";
        error.status = 401;
        reject(error);
      }
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
let checkValidUser = (email, password, cb) => {
  checkUserExist(email, async (exists) => {
    try {
      if (!exists) {
        let error = new Error();
        error.message = "Email id Does not exists";
        error.status = 401;
        error.redirect={link:"../signup",linkText:"SignUp"}
        // console.log("Err", error);
        return cb(error);
      }
      let validPassword = await checkValidPassword(email, password);
      cb(validPassword);
    } catch (error) {
      cb(error);
    }
  });
};

module.exports = {
  testCreateUser,
  checkUserExist,
  checkValidUser,
};
