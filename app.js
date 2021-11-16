const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./_config");
const mongoose = require("mongoose");

//* mongoose conect *//
mongoose.connect(config.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const usersRoutes = require("./routes/users");
const clientsRoutes = require("./routes/clients");
const ordersRoutes = require("./routes/orders");
const orderNumberRoutes = require("./routes/orderNumber");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/users", usersRoutes);
app.use("/clients", clientsRoutes);
app.use("/orders", ordersRoutes);
app.use("/ordernumber", orderNumberRoutes);

app.listen(9000, () => console.log("Server for appForm has started"));

module.exports = app;
