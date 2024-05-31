const mssql = require("mssql");
const colors = require("colors")

const config = {
  server: process.env.DB_Server,
  database: process.env.DB,
  authentication: {
    type: "default",
    options: {
      userName: process.env.DB_User,
      password: process.env.DB_PWD,
    },
  },
  options: {
    encrypt: true,
    trustServerCertificate: false,
    enableArithAbort: true,
  },
};

const pool = mssql.connect(config);
const connectMSSQL = async () => {
  try {
    if (await pool !== undefined) {
      console.log("Connected to Azure SQL".underline.cyan);
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = { pool, connectMSSQL };