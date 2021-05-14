const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BotSchema = Schema(
  {
    name: String,
    username: String,
    score: Number,
    groupe_id: Array,
    groupe_name: Array,
  },
  { timestamps: true },
);

module.exports = mongoose.model("BotData", BotSchema);
