const mysql = require("mysql");

// Create connection To database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((error) => {
  if (error) {
    console.log(error);
    process.exit(1);
  }
  console.log("Database Connected");
});
module.exports = connection;
