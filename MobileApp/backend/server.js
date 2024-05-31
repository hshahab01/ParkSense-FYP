require("dotenv").config();
const cors = require('cors');
const {detectSpaces} = require('./cv/spaceDetector')
const parkingSpaceRouter = require("./routes/parkingSpaceRouter")
require("colors");

const express = require("express");
const { connectFirebase } = require("./db/firebaseConfig");
const { connectMSSQL } = require("./db/sqlConfig");

const loginRoutes = require("./routes/loginRoutes");
const carOwnerRoutes = require("./routes/carOwnerRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/parking", parkingSpaceRouter)
const PORT = process.env.PORT || 8000;

connectFirebase();
connectMSSQL();
//detectSpaces();

app.use("/login", loginRoutes);
app.use("/car", carOwnerRoutes);

app.listen(PORT, () => {
  console.log(`\nMobile App Server is listening on ${PORT}`.underline.green);
});
