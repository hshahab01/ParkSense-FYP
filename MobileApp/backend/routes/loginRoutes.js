const express = require("express");
const router = express.Router();
const login = require("../controllers/loginController");
// const auth = require("../middleware/auth");

router.post("/", login.loginAuth);

module.exports = router;