const loginOps = require("../db/loginOps");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

exports.loginAuth = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validator.isEmail(email) || !password) {
      return res.status(400).json({ message: "Enter all required fields." });
    }

    const pass = await loginOps.loginOps(email);
    if (pass === 0) {
      return res.status(401).json({ message: "Invalid Credentials." });
    }

    if (await bcrypt.compare(password, pass.Password)) {
      const details = await loginOps.getDetails(email, pass.UserRole);
      let jwToken;
      if (
        pass.UserRole.toUpperCase() === "CAROWNER" ||
        pass.UserRole.toUpperCase() === "ADMIN"
      ) {
        jwToken = generateToken(
          pass.UserRole.toUpperCase(),
          details.User.ID,
          details.User.FirstName + " " + details.User.LastName,
          details.Avatar
        );
      } else {
        jwToken = generateToken(
          pass.UserRole.toUpperCase(),
          details.User.ID,
          details.User.Name,
          details.Avatar
        );
      }
      return res.send({
        token: jwToken,
        role: pass.UserRole,
        Details: details,
      });
    } else {
      return res.status(401).json({ message: "Invalid Credentials." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const generateToken = (role, id, name, avatar) => {
  return jwt.sign({ role, id, name, avatar }, process.env.JWT_SECRET, {
    expiresIn: "10000s",
  });
};
