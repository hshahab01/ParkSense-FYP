const express = require("express");
const router = express.Router();
const register = require("../controllers/registerController");

router.post("/", register.registerAuth);
router.get("/profile", register.registerAuth);


module.exports = router;