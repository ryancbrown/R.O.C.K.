require("dotenv").config();

module.exports = {
  development: {
    username: "root",
    password: "Spl3ndid",
    database: "pocrockdb",
    host: "localhost",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: "password",
    database: "testdb",
    host: "localhost",
    dialect: "mysql",
    logging: false
  },
  production: {
    connection: process.env.JAWSDB_URL,
    dialect: "mysql"
  }
};
