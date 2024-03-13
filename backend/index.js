const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./authRouter");
const cors = require("cors");
const dotenv = require('dotenv').config();
const PORT = dotenv.parsed.PORT || 5000;

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: dotenv.parsed.DB_FRONT_URL,
  }),
);
app.use("/auth", authRouter);

const start = async () => {
  try {
    await mongoose.connect(
      dotenv.parsed.DB_MONGODB_KEY,
    );
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
