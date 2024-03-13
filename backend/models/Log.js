const { Schema, model } = require("mongoose");

const Log = new Schema({
  project: { type: String, required: true },
  name: { type: String, required: true },
  message: { type: String, required: true },
  stack: { type: String, required: true },
  system: { type: String, required: true },
  browser: { type: String, required: true },
  user: { type: String, required: true },
  date: { type: String, required: true },
});

module.exports = model("Log", Log);
