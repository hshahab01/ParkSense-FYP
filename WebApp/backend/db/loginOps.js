// const config = require("./sqlConfig");
const { pool } = require("./sqlConfig");
const sql = require("mssql");

exports.loginOps = async (email) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS
      .request()
      .input("email", sql.VarChar, email)
      .query(`exec loginUser @email`);
    if (query.recordset[0][""] === 0) {
      return query.recordset[0][""];
    } else if (query.recordset[0]) {
      return query.recordset[0];
    } else {
      console.log(error);
      res.status(400).json({ "DB ERROR": error });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};
exports.getDetails = async (email, role) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS
      .request()
      .input("Email", sql.VarChar, email)
      .input("UserRole", sql.VarChar, role)
      .query(`exec getDetails @Email, @UserRole`);
    if (query.recordset[0][""] === 0) {
      return query.recordset[0][""];
    } else if (query.recordset[0]) {
      return {
        User: query.recordsets[0][0],
        Avatar: query.recordsets[1][0].AvatarID
      } 
    } else {
      console.log(error);
      res.status(400).json({ "DB ERROR": error });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};
