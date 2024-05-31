const sql = require("mssql");
const { pool } = require("./sqlConfig");

exports.kioskRegister = async (kiosk, password) => {
  try {
    let poolS = await pool;
    let query = await poolS
      .request()
      .input("Email", sql.VarChar, kiosk.Email)
      .input("Password", sql.VarChar, password)
      .input("Name", sql.VarChar, kiosk.Name)
      .input("AddressL1", sql.VarChar, kiosk.AddressL1)
      .input("AddressL2", sql.VarChar, kiosk.AddressL2)
      .input("PostalCode", sql.VarChar, kiosk.PostalCode)
      .input("City", sql.VarChar, kiosk.City)
      .input("Country", sql.VarChar, kiosk.Country)
      .input("PhoneNo", sql.VarChar, kiosk.PhoneNo)
      .query(
        `EXEC RegisterKiosk @Email, @Password, @Name, @AddressL1, @AddressL2, @PostalCode, @City, @Country, @PhoneNo`
      );
    return "Success";
  } catch (error) {
    console.log(error);
    throw new Error("DB ERROR: " + error.message);
  }
};

exports.kioskExists = async (Email) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS
      .request()
      .input("Email", sql.VarChar, Email)
      .query(`SELECT Email from KioskCredentials where Email = @Email`);
    return query.recordsets[0].length;
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
    return;
  }
};

exports.kioskLogin = async (email) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS
      .request()
      .input("email", sql.VarChar, email)
      .query(`exec loginKiosk @email`);
    if (query.recordset[0][""] === 0) {
      return query.recordset[0][""];
    } else if (query.recordset[0]) {
      return { Creds: query.recordset[0], User: query.recordsets[1][0] };
    } else {
      console.log(error);
      res.status(400).json({ "DB ERROR": error });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};

exports.searchUser = async (Email) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS
      .request()
      .input("Email", sql.VarChar, Email)
      .query(`SELECT * FROM CAROWNER WHERE EMAIL = @Email`);
    return query.recordset[0];
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};

exports.credit = async (CarID, Amount, KioskID) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS
      .request()
      .input("CarID", sql.Int, CarID)
      .input("Amount", sql.Int, Amount)
      .input("KioskID", sql.Int, KioskID)
      .query(`exec CreditCoins @CarID, @Amount, @KioskID`);
    return query.recordset[0][""];
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};
