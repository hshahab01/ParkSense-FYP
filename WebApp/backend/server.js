const express = require("express");
var colors = require("colors");
require("dotenv").config();
const cors = require("cors");
const { connectMSSQL } = require("./db/sqlConfig");
const { connectFirebase } = require("./db/firebaseConfig");

const loginRoutes = require("./routes/loginRoutes");
const lotOwnerRoutes = require("./routes/lotOwnerRoutes");
const carOwnerRoutes = require("./routes/carOwnerRoutes");
const adminRoutes = require("./routes/adminRoutes");
const kioskRoutes = require("./routes/kioskRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

connectMSSQL();
connectFirebase();

app.use("/login", loginRoutes);
app.use("/admin", adminRoutes);
app.use("/lot", lotOwnerRoutes);
app.use("/car", carOwnerRoutes);
app.use("/kiosk", kioskRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`.underline.magenta);
});
