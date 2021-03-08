const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  orderNumber: { type: String, required: true },
  clientName: { type: String, required: true },
  clientAdress: { type: String, required: true },
  clientVatNo: { type: String, required: true },
  carrierName: { type: String, required: true },
  carrierAdress: { type: String, required: true },
  carrierVatNo: { type: String, required: true },
  orderLoadDate: { type: String },
  orderLoadHrs: { type: String },
  orderLoadCountry: { type: String },
  orderLoadZip: { type: String },
  orderLoadCity: { type: String },
  orderLoadAdress: { type: String },
  orderUnloadDate: { type: String },
  orderUnloadHrs: { type: String },
  orderUnloadCountry: { type: String },
  orderUnloadZip: { type: String },
  orderUnloadCity: { type: String },
  orderUnloadAdress: { type: String },
  orderGoodsSpecyfications: { type: String },
  orderDriver: { type: String },
  orderTruck: { type: String },
  orderInfo: { type: String },
  orderAdr: { type: String },
  orderFix: { type: String },
});

module.exports = mongoose.model("Order", orderSchema);
