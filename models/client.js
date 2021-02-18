const mongoose = require("mongoose");
const { Schema } = mongoose;

const clientSchema = new Schema({
  name: { type: String, required: true },
  adress: { type: String, required: true },
  vat: { type: String, required: true },
  mail: { type: String, required: true },
  info: { type: String, required: true },
});

module.exports = mongoose.model("Client", clientSchema);
