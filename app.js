// Imports
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const authRoutes = require("./routes/auth");

// Middlewares
app.enable("trust proxy")
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes Prefix
app.use("/api/user/", authRoutes);

const PORT = process.env.PORT || 3000;
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
} = require("./configs/config");

app.use("/api", (req, res, next) => {
  res.send("<h2> Hello there!</h2>");
  console.log("Yeah, Its working")
});

mongoose
  .connect(
    `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
  )
  .then(() => console.log("Db is running"))
  .catch((e) => console.log(e));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
