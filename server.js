const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config");
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

const server = express();

server.use(bodyParser.json());
server.use(cors());

server.use("/users", usersRoutes);
server.use("/clients", clientsRoutes);
server.use("/orders", ordersRoutes);

server.listen(8000, () => console.log("Server for appForm has started"));
