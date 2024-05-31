const kioskOps = require("../db/kioskOps");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

exports.registerKiosk = async (req, res) => {
  try {
    const details = req.body;

    const userExists = await kioskOps.kioskExists(details.Email);
    if (userExists === 1) {
      return res
        .status(403)
        .json({ message: "User already exists. Try logging in." });
    }

    if (details.Role.toUpperCase() === "KIOSK") {
      if (
        !details.Name ||
        !validator.isEmail(details.Email) ||
        !details.AddressL1 ||
        !details.PostalCode ||
        !details.City ||
        !details.Country ||
        !details.PhoneNo ||
        !details.Password ||
        !details.Password2
      ) {
        return res.status(400).json({ message: "Enter all required fields." });
      }

      if (details.Password !== details.Password2) {
        return res.status(400).json({ message: "Passwords do not match." });
      }

      const kiosk = {
        Role: details.Role.toUpperCase(),
        Email: details.Email.toUpperCase(),
        Name: details.Name.replace(/'/gi, "''"),
        AddressL1: details.AddressL1,
        AddressL2: details.AddressL2,
        PostalCode: details.PostalCode,
        City: details.City,
        Country: details.Country,
        PhoneNo: details.PhoneNo,
      };

      const hashedPassword = await bcrypt.hash(details.Password, 10);

      const success = await kioskOps.kioskRegister(kiosk, hashedPassword);
      if (success) {
        return res
          .status(201)
          .json({ Status: "Kiosk registered successfully." });
      } else {
        return res.status(500).json({ message: "Failed to register kiosk." });
      }
    } else {
      return res.status(400).json({ message: "Invalid role." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

exports.loginKiosk = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validator.isEmail(email) || !password) {
      return res.status(400).json({ message: "Enter all required fields." });
    }
    const pass = await kioskOps.kioskLogin(email);
    if (pass === 0) {
      return res.status(401).json({ message: "Invalid Credentials." });
    }
    if (await bcrypt.compare(password, pass.Creds.Password)) {
      const jwToken = generateToken(
        "KIOSK",
        pass.Creds.KioskID,
        pass.User.Name
      );
      return res.send({
        token: jwToken,
      });
    } else {
      return res.status(401).json({ message: "Invalid Credentials." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.searchUser = async (req, res) => {
  if (req.user.role === "KIOSK") {
    try {
      const { email } = req.body;
      const profile = await kioskOps.searchUser(email);
      res.json(profile);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

exports.credit = async (req, res) => {
  if (req.user.role === "KIOSK") {
    try {
      const details = req.body;
      if (details.amount < 1) {
        res.status(200).json({ message: "Invalid amount" });
        return;
      }
      const credit = await kioskOps.credit(
        details.ID,
        details.Amount,
        req.user.id
      );
      if (credit === 1) {
        res.status(200).json({ message: "Success" });
      } else {
        res.status(204).json({ message: "User does not exist" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

const generateToken = (role, id, name) => {
  return jwt.sign({ role, id, name }, process.env.JWT_SECRET, {
    expiresIn: "5000s",
  });
};
