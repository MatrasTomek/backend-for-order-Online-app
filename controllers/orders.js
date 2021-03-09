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

// // get one client from DB by vatNo
// exports.getClient = (request, response, next) => {
//   try {
//     const { vatNo } = request.params;

//     const findClient = Client.find({ vatNo: vatNo });
//     findClient.exec((err, data) => {
//       if (data.length === 0 || data === null) {
//         response.status(404).json({
//           message: "Nie znaleziono klienta o numerze nip:",
//         });
//         return;
//       }
//       response.status(200).json({
//         client: data,
//       });
//     });
//   } catch (error) {
//     response.status(500).json({
//       error,
//       message:
//         "Oops! Coś poszło nie tak, przy metodzie GET w endpointcie /clients/:vatNo",
//     });
//   }
// };

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

// // edit and change data of client
// exports.putClient = (request, response, next) => {
//   try {
//     const {
//       clientId,
//       companyName,
//       companyAdress,
//       vatNo,
//       eMail,
//       info,
//     } = request.body;

//     const filter = clientId;
//     const update = {
//       companyName,
//       companyAdress,
//       vatNo,
//       eMail,
//       info,
//     };

//     Client.findByIdAndUpdate(clientId, update, { new: true }, (err, data) => {
//       if (err) {
//         response.status(404).json({
//           message: "coś poszło nie tak przy ClientUpdate",
//         });
//         return;
//       }
//       response.status(202).json({
//         data,
//       });
//     });
//   } catch (error) {
//     response.status(500).json({
//       error,
//       message:
//         "Oops! Coś poszło nie tak, przy metodzie PUT w endpointcie /clients",
//     });
//   }
// };
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
