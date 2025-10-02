const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  title: String,
  date: Date,
  url: String,
});

const Images = mongoose.model("image", ImageSchema);

module.exports = Images;
