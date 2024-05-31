const express = require('express');
const {getEmptySpaces, updateEmptySpaces, incEmptySpaces, decEmptySpaces} = require("../controllers/parkingSpaceController")

const router = express.Router();

router.get('/get/:lotid?', getEmptySpaces);
router.patch("/inc/:lotid/:zoneid",incEmptySpaces)
router.patch("/dec/:lotid/:zoneid",decEmptySpaces)
router.patch("/:lotid/:zoneid",updateEmptySpaces)

module.exports = router