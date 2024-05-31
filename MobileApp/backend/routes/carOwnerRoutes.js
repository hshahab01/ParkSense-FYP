const express = require("express");
const router = express.Router();
const carOwnerController = require("../controllers/carOwnerController");
const auth = require("../middleware/auth");


router.get("/", auth , carOwnerController.viewVehicles)
router.get('/current', auth, carOwnerController.getCurrentParkingSessions);
router.get('/past', auth, carOwnerController.getPastParkingSessions);
router.get('/all', auth, carOwnerController.getAllParkingSessions);
router.get("/profile", auth, carOwnerController.getProfile)
router.get("/recent", auth, carOwnerController.getRecentParkingLots)
router.get("/frequent", auth, carOwnerController.getFrequentParkingLots)
router.get("/lotinfo", auth, carOwnerController.getLotInfo)
router.get('/coins', auth, carOwnerController.getUserCoins);
router.get('/transactions', auth, carOwnerController.getUserTransactionHistory);
router.put("/profile", auth , carOwnerController.updateProfile)
router.post("/", auth , carOwnerController.addCar)
router.post("/support", auth , carOwnerController.support)
router.delete("/:regno", auth , carOwnerController.deleteCar)
router.post('/start', auth, carOwnerController.startParkingSession);
router.post('/end', auth, carOwnerController.endParkingSession);


module.exports = router;