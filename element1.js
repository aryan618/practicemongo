const mongoose = require("mongoose");

const elementSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Element = mongoose.model("Element", elementSchema);

module.exports = Element;
