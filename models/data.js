const mongoose = require("mongoose");
const { Schema } = mongoose;

const dataSchema = new Schema({
  orderNo: { type: Number },
});

module.exports = mongoose.model("Data", dataSchema);
