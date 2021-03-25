const Order = require("../models/order.js");

// get all orders from DB
exports.getOrders = (request, response, next) => {
  try {
    const findOrders = Order.find();
    findOrders.exec((err, data) => {
      response.status(200).json({
        data,
      });
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie GET w endpointcie /orders",
    });
  }
};

// get one order from DB by search
exports.getOrder = (request, response, next) => {
  try {
    const value = request.params.value;

    const findOrder = Order.find({
      orderNumber: new RegExp(value, "i"),
    });
    findOrder.exec((err, data) => {
      if (data.length === 0 || data === null) {
        response.status(404).json({
          message: "Nie ma zlecenia o takim numerze",
        });
        return;
      }
      response.status(200).json({
        data,
      });
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie GET w endpointcie /orders/search",
    });
  }
};

// // add client to DB from addClientFrom
exports.postOrder = (request, response, next) => {
  try {
    const body = request.body;

    const newOrder = new Order(body);

    newOrder.save((err, data) => {
      if (err) {
        console.log(body, err);
        return;
      }
      response.status(201).json({
        data,
      });
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie POST w endpointcie /clients/",
    });
  }
};

// edit and change data of order
exports.putOrder = (request, response, next) => {
  try {
    const {
      carrierAdress,
      carrierName,
      carrierVatNo,
      clientAdress,
      clientName,
      clientVatNo,
      orderAdr,
      orderCarrierCurr,
      orderCarrierPrice,
      orderCarrierTerms,
      orderClientCurr,
      orderClientPrice,
      orderClientTerms,
      orderDriver,
      orderFix,
      orderLoadAdress,
      orderLoadCity,
      orderLoadCountry,
      orderLoadDate,
      orderLoadHrs,
      orderLoadZip,
      orderTruck,
      orderUnloadAdress,
      orderUnloadCity,
      orderUnloadCountry,
      orderUnloadDate,
      orderUnloadHrs,
      orderUnloadZip,
      orderNumber,
    } = request.body;

    const filter = orderNumber;
    const update = {
      carrierAdress,
      carrierName,
      carrierVatNo,
      clientAdress,
      clientName,
      clientVatNo,
      orderAdr,
      orderCarrierCurr,
      orderCarrierPrice,
      orderCarrierTerms,
      orderClientCurr,
      orderClientPrice,
      orderClientTerms,
      orderDriver,
      orderFix,
      orderLoadAdress,
      orderLoadCity,
      orderLoadCountry,
      orderLoadDate,
      orderLoadHrs,
      orderLoadZip,
      orderTruck,
      orderUnloadAdress,
      orderUnloadCity,
      orderUnloadCountry,
      orderUnloadDate,
      orderUnloadHrs,
      orderUnloadZip,
    };

    Order.findByIdAndUpdate(filter, update, { new: true }, (err, data) => {
      if (err) {
        response.status(404).json({
          message: "coś poszło nie tak przy OrderUpdate",
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
        "Oops! Coś poszło nie tak, przy metodzie PUT w endpointcie /order",
    });
  }
};

// delete one order by _id
exports.deleteOrder = (request, response, next) => {
  try {
    Order.findByIdAndDelete(request.params.id, (err) => {
      if (err) {
        response.status(404).json({
          message: "Nie znaleziono zlecenia o podanym id",
        });
        return;
      }
      response.status(200).end();
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie DELETE w endpointcie /orders/:id",
    });
  }
};
