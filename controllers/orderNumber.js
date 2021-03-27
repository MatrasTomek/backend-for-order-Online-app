const Data = require("../models/data.js");

// get data from DB
exports.getData = (request, response, next) => {
  try {
    const findCData = Data.find();
    findCData.exec((err, data) => {
      response.status(200).json({
        data,
      });
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie GET w endpointcie /data",
    });
  }
};

// put data to DB
exports.putData = (request, response, next) => {
  try {
    const { orderNo, id } = request.body;

    const filter = id;
    const update = {
      orderNo,
    };

    Data.findByIdAndUpdate(filter, update, { new: true }, (err, data) => {
      if (err) {
        response.status(404).json({
          message: "coś poszło nie tak przy ClientUpdate",
        });
        return;
      }
      response.status(202).json({
        data,
      });
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie PUT w endpointcie /clients",
    });
  }
};
