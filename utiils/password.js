const bcrypt = require("bcrypt");
const saltRounds = 10;
const userModel = require("../model/UserModel");

let encryptPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (error, encryptedPassword) => {
      if (error) reject(error);
      resolve(encryptedPassword);
    });
  });
};

let validatePassword = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await userModel.getPassword(email);
      bcrypt.compare(password, result[0].password, (error, validPassword) => {
        if (error) reject(error);
        resolve(validPassword);
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { encryptPassword, validatePassword };
