const connection = require("../config/dbconfig");

let execute = (sql, data) => {
  return new Promise((resolve, reject) => {
    if (Array.isArray(data) && data.length) {
      connection.query(sql, data, (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    } else {
      connection.query(sql, (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    }
  });
};

module.exports = { execute};
