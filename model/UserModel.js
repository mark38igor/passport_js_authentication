// import database functionalities from utils  folder
const db = require("../utiils/db");

// Create a new user
let createUser = (userData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let sql = "INSERT INTO  login (name,email,password) values (?,?,?)";
      let result = await db.execute(sql, [
        userData.name,
        userData.email,
        userData.password,
      ]);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

// get user info by email
let getInfo = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let sql = `SELECT name,email,id from login where email=? `;
      let result = await db.execute(sql, [email]);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
// get user info by id
let getInfoById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let sql = `SELECT name,email,id from login where id=? `;
      let result = await db.execute(sql, [id]);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

let getPassword = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let sql = `SELECT password from login where email=? `;
      let result = await db.execute(sql, [email]);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createUser,
  getInfo,
  getPassword,
  getInfoById,
};
