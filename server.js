const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config");
const mongoose = require("mongoose");

//* mongoose conect *//
mongoose.connect(config.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// const formsRoutes = require("./routes/forms");
const usersRoutes = require("./routes/users");

const server = express();

server.use(bodyParser.json());
server.use(cors());

// server.use("/forms", formsRoutes);
server.use("/users", usersRoutes);

server.listen(8000, () => console.log("Server for course is started..."));
