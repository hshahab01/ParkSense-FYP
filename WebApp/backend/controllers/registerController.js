const lotOwnerStruct = require("../Structures/lotOwnerStruct");
const adminStruct = require("../Structures/adminStruct");
const carOwnerStruct = require("../Structures/carOwnerStruct");
const registerOps = require("../db/registerOps");
const bcrypt = require("bcrypt");
const validator = require("validator");

exports.registerAuth = async (req, res) => {
  try {
    const details = req.body;
    /////////////////////////////////////////// USER EXISTS ////////////////////////////////////////////////////////////////////
    if ((await registerOps.userExists(details.email)) === 1) {
      res.status(403).json({ message: "User already exists. Try logging in." });
      return;
    } else {
      /////////////////////////////////////////// ADMIN ////////////////////////////////////////////////////////////////////
      if (details.role.toUpperCase() === "ADMIN") {
        if (
          !details.role ||
          !details.firstName ||
          !details.lastName ||
          !details.email.endsWith("@parksense.com") ||
          !details.password ||
          !details.password2
        ) {
          res.status(400).json({ message: "Enter all required fields." });
          return;
        }
        if (details.password !== details.password2) {
          res.status(400).json({ message: "Passwords do not match." });
          return;
        } else {
          const admin = new adminStruct(
            details.role.toUpperCase(),
            details.firstName.replace(/'/gi, "''"),
            details.lastName.replace(/'/gi, "''"),
            details.email.toUpperCase()
          );
          const succ = await registerOps.adminRegister(
            admin,
            await bcrypt.hash(details.password, 10)
          );
          res.status(201).json({ Status: `${succ}` });
          return;
        }
      }

      /////////////////////////////////////////// LOT OWNER ////////////////////////////////////////////////////////////////////
      else if (details.role.toUpperCase() === "LOTOWNER") {
        if (
          !details.role ||
          !validator.isEmail(details.email) ||
          !details.name ||
          !details.phoneNo ||
          !details.password ||
          !details.password2
        ) {
          res.status(400).json({ message: "Enter all required fields." });
          return;
        }
        if (details.password !== details.password2) {
          res.status(400).json({ message: "Passwords do not match." });
          return;
        } else {
          const lotOwner = new lotOwnerStruct(
            details.role.toUpperCase(),
            details.email.toUpperCase(),
            details.name.replace(/'/gi, "''"),
            details.phoneNo
          );
          const succ = await registerOps.lotOwnerRegister(
            lotOwner,
            await bcrypt.hash(details.password, 10)
          );
          res.status(201).json({ Status: `${succ}` });
          return;
        }
      }

      /////////////////////////////////////////// CAR ////////////////////////////////////////////////////////////////////
      else if (details.role.toUpperCase() === "CAROWNER") {
        if (
          !details.role ||
          !details.firstName ||
          !details.lastName ||
          !details.gender ||
          !details.DOB ||
          !validator.isEmail(details.email) ||
          !details.country ||
          !details.password ||
          !details.password2
        ) {
          res.status(400).json({ message: "Enter all required fields." });
          return;
        }
        if (details.password !== details.password2) {
          res.status(400).json({ message: "Passwords do not match." });
          return;
        } else {
          if (!details.phoneNo) {
            details.phoneNo = "";
          }
          if (!details.coins) {
            details.coins = 0;
          }

          let avatar = 0;
          if (details.gender.toUpperCase() === "MALE") {
            avatar = getRandomOddNumber(
              process.env.MinAvatarLimit,
              process.env.MaxAvatarLimit
            );
          } else if (details.gender.toUpperCase() === "FEMALE") {
            avatar = getRandomEvenNumber(
              process.env.MinAvatarLimit,
              process.env.MaxAvatarLimit
            );
          } else {
            avatar = 0;
          }

          const carOwner = new carOwnerStruct(
            details.role.toUpperCase(),
            details.firstName.replace(/'/gi, "''"),
            details.lastName.replace(/'/gi, "''"),
            details.gender.replace(/'/gi, "''"),
            details.DOB,
            details.phoneNo,
            details.email.toUpperCase(),
            details.city.replace(/'/gi, "''"),
            details.country.replace(/'/gi, "''"),
            details.coins
          );
          const succ = await registerOps.carOwnerRegister(
            carOwner,
            avatar,
            await bcrypt.hash(details.password, 10)
          );
          res.status(201).json({ Status: `${succ}` });
          return;
        }
      }
      /////////////////////////////////////////// INVALID ROLE ////////////////////////////////////////////////////////////////////
      else {
        res.status(400).json({ message: "Invalid role." });
        return;
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
    return;
  }
};

function getRandomOddNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  let randInt;
  do {
    randInt = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (randInt % 2 === 0 || randInt > max);
  return randInt;
}

function getRandomEvenNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  let randInt;
  do {
    randInt = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (randInt % 2 !== 0 || randInt > max);
  return randInt;
}
