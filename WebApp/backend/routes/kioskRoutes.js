const express = require("express");
const router = express.Router();
const kioskController = require("../controllers/kioskController");
const auth = require("../middleware/auth");

router.post("/register", kioskController.registerKiosk);
router.post("/login", kioskController.loginKiosk);

router.post("/search", auth, kioskController.searchUser);
router.post("/topup", auth, kioskController.credit);

module.exports = router;
