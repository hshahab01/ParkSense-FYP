const carOwnerOps = require("../db/carOwnerOps");
const paginate = require("../middleware/pagination");
const { fb } = require("../db/firebaseConfig");

exports.viewVehicles = async (req, res) => {
  if (req.user.role === "CAROWNER") {
    try {
      const pages = await paginate.paginate(req.query.page);
      const profile = await carOwnerOps.viewVehicles(
        req.user.id,
        pages.start,
        pages.limit
      );
      res.json(profile);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
exports.getProfile = async (req, res) => {
  if (req.user.role === "CAROWNER") {
    try {
      const profile = await carOwnerOps.getProfile(req.user.id);
      res.json(profile);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
exports.updateProfile = async (req, res) => {
  if (req.user.role === "CAROWNER") {
    try {
      const post = req.body;
      const update = await carOwnerOps.updateProfile(req.user.id, post);
      if (update === 1) {
        res.status(200).json({ message: "Success" });
      } else {
        res.status(204).json({ message: "User not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
exports.addCar = async (req, res) => {
  if (req.user.role === "CAROWNER") {
    try {
      const post = req.body;
      if (
        !post.RegNo ||
        !post.Make ||
        !post.Model ||
        !post.RegYear ||
        !post.Color ||
        !post.RegisteredCountry ||
        !post.Type
      ) {
        res.status(400).json({ message: "Enter all required fields." });
        return;
      }
      const update = await carOwnerOps.addCar(req.user.id, post);
      if (update === 1) {
        res.status(200).json({ message: "Success" });
      } else {
        res.status(409).json({ message: "Car is already registered." });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
exports.support = async (req, res) => {
  if (req.user.role === "CAROWNER") {
    try {
      const subject = req.body.subject;
      const id = req.user.id + ": " + subject;
      const body = req.body.body;

      if (!subject || !body) {
        res.status(400).json({ message: "Enter all required fields." });
        return;
      }
      if (subject.length > 65) {
        res
          .status(400)
          .json({ message: "Subject must be maximum 60 characters long." });
        return;
      }

      if (body.length > 510) {
        res
          .status(400)
          .json({ message: "Body must be maximum 500 characters long." });
        return;
      }
      const response = await fb
        .collection("Car-Support")
        .doc(id)
        .set({ subject, body, status: "PENDING" });
      res.send(response);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

exports.deleteCar = async (req, res) => {
  if (req.user.role === "CAROWNER") {
    try {
      const carNum = decodeURIComponent(req.params.regno);
      const update = await carOwnerOps.deleteCar(req.user.id, carNum);
      if (update === 1) {
        res.status(200).json({ message: "Success" });
      } else {
        res.status(204).json({ message: "Car not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

exports.startParkingSession = async (req, res) => {
  if (req.user.role === "CAROWNER") {
    try {
      const { carRegNo, lotID } = req.body;
      const inTime = new Date();
      const dayIn = inTime.getDate();

      const userId = req.user.id;

      const result = await carOwnerOps.startSession(carRegNo, lotID, inTime, dayIn, userId);
      res.status(201).json({ message: "Parking session started successfully" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Failed to start parking session", error });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};


exports.endParkingSession = async (req, res) => {
  if (req.user.role === "CAROWNER") {
    try {
      const { carRegNo } = req.body;
      const outTime = new Date();
      const dayOut = outTime.getDate();

      const { rowsAffected, charge } = await carOwnerOps.endSession(carRegNo, outTime, dayOut);

      if (rowsAffected > 0) {
        res.json({ message: "Parking session ended successfully", charge });
      } else {
        res.status(404).json({ message: "Parking session not found or already ended" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Failed to end parking session", error });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};


exports.getCurrentParkingSessions = async (req, res) => {
  console.log("User object:", req.user);
  const userID = req.user.id;
  console.log(userID)
  try {
    const currentSessions = await carOwnerOps.getCurrentSessions(userID);
    res.json(currentSessions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch current parking sessions" });
  }
};

exports.getPastParkingSessions = async (req, res) => {
  const userID = req.user.id;
  try {
    const pastSessions = await carOwnerOps.getUserPastSessions(userID);
    res.json(pastSessions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch user's past parking sessions" });
  }
};

exports.getAllParkingSessions = async (req, res) => {
  const userID = req.user.id;
  try {
    const allSessions = await carOwnerOps.getAllSessions(userID);
    res.json(allSessions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch user's all parking sessions" });
  }
};

exports.getRecentParkingLots = async (req, res) => {
  if (req.user.role === "CAROWNER") {
    try {
      const userID = req.user.id;
      const limit = req.body.limit || 5;

      const recentParkingLots = await carOwnerOps.getRecentParkingLots(userID, limit);
      res.json(recentParkingLots);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to fetch recent parking lots", error });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

exports.getFrequentParkingLots = async (req, res) => {
  if (req.user.role === "CAROWNER") {
    try {
      const userID = req.user.id;
      const limit = req.body.limit || 5;

      const frequentParkingLots = await carOwnerOps.getFrequentParkingLots(userID, limit);
      res.json(frequentParkingLots);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to fetch frequent parking lots", error });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

exports.getLotInfo = async (req, res) => {
  try {
    const lotInfo = await carOwnerOps.getLotInfo();
    res.json(lotInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch lot information", error: error.message });
  }
};

exports.getUserCoins = async (req, res) => {
  if (req.user.role === "CAROWNER") {
    try {
      const userId = req.user.id;
      const result = await carOwnerOps.getUserCoins(userId);
      if (result) {
        res.json({ coins: result.Coins });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Failed to fetch user coins", error });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

exports.getUserTransactionHistory = async (req, res) => {
  if (req.user.role === "CAROWNER") {
    try {
      const userId = req.user.id;
      const transactions = await carOwnerOps.getUserTransactionHistory(userId);
      if (transactions.length > 0) {
        res.json({ transactions });
      } else {
        res.status(404).json({ message: "No transactions found for this user" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Failed to fetch transaction history", error });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};





