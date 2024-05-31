const sql = require("mssql");
const { pool } = require("./sqlConfig");

exports.adminRegister = async (admin, password) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS
      .request()
      .input("role", sql.VarChar, admin.role)
      .input("firstName", sql.VarChar, admin.firstName)
      .input("lastName", sql.VarChar, admin.lastName)
      .input("email", sql.VarChar, admin.email)
      .input("password", sql.VarChar, password)
      .query(
        `exec registerPSAdmin @role,@firstName,@lastName,@email,@password`
      );
    return "Success";
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
    return;
  }
};
exports.lotOwnerRegister = async (lotOwner, password) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS;
    const request = query.request();
    const result = await request
      .input("role", sql.VarChar, lotOwner.role)
      .input("email", sql.VarChar, lotOwner.email)
      .input("name", sql.VarChar, lotOwner.name)
      .input("phoneNo", sql.VarChar, lotOwner.phoneNo)
      .input("password", sql.VarChar, password)
      .query(`exec registerlotOwner @role, @email, @phoneNo, @name, @password`);
    return "Success";
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
    return;
  }
};
exports.carOwnerRegister = async (carOwner, avatar, password) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS;
    const request = query.request();
    const result = await request
      .input("role", sql.VarChar, carOwner.role)
      .input("email", sql.VarChar, carOwner.email)
      .input("firstName", sql.VarChar, carOwner.firstName)
      .input("lastName", sql.VarChar, carOwner.lastName)
      .input("gender", sql.VarChar, carOwner.gender)
      .input("dob", sql.Date, carOwner.DOB)
      .input("phoneNo", sql.VarChar, carOwner.phoneNo)
      .input("city", sql.VarChar, carOwner.city)
      .input("country", sql.VarChar, carOwner.country)
      .input("coins", sql.Decimal, carOwner.coins)
      .input("password", sql.VarChar, password)
      .input("avatar", sql.TinyInt, avatar)
      .query(
        `exec registercarOwner @role, @email, @firstName, @lastName, @gender, @dob,
        @phoneNo, @city, @country, @coins, @password, @avatar`
      );
    return "Success";
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
    return;
  }
};
exports.userExists = async (email) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS
      .request()
      .input("email", sql.VarChar, email)
      .query(`SELECT email from Credentials where email = @email`);
    return query.recordsets[0].length;
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
    return;
  }
};
