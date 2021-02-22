const { v4: uuid } = require("uuid");
const Client = require("../models/client.js");

// get all clients from DB

exports.getClients = (request, response, next) => {
  try {
    const findClients = Client.find();
    findClients.exec((err, data) => {
      response.status(200).json({
        data,
      });
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie GET w endpointcie /courses",
    });
  }
};

// exports.getClient = (request, response, next) => {
//   try {
//     const { vatNo } = request.params;
//     const clientToSend = clientsData.find((client) => client.vatNo === vatNo);

//     if (!clientToSend) {
//       response.status(404).json({
//         message: "Nie znaleziono klienta o podanym numerze nip",
//       });

//       return;
//     }

//     response.status(200).json({
//       client: clientToSend,
//     });
//   } catch (error) {
//     response.status(500).json({
//       error,
//       message:
//         "Oops! Coś poszło nie tak, przy metodzie GET w endpointcie /courses/:id",
//     });
//   }
// };

// add cleint to DB from addClientFrom
exports.postClient = (request, response, next) => {
  const body = request.body;
  const newClient = new Client(body);

  newClient.save((err) => {
    if (err) {
      console.log(body, err);
      return;
    }
    response.status(201).json({
      clients: "OK",
    });
  });
};

// exports.putClient = (request, response, next) => {
//   try {
//     const { authors, id, price, title } = request.body;
//     if (!authors || !id || !price || !title) {
//       response.status(400).json({
//         message: "Nie podano wszystkich wymaganych informacji",
//       });

//       return;
//     }

//     const indexCourseToUpdate = clientsData.findIndex(
//       (client) => client.vatNo === vatNo
//     );
//     if (indexClientToUpdate === -1) {
//       response.status(404).json({
//         message: "Nie znaleziono klienta o podanym numerze nip",
//       });

//       return;
//     }

//     clientsData.splice(indexCourseToUpdate, 1, request.body);

//     response.status(202).json({
//       clients: clientsData,
//     });
//   } catch (error) {
//     response.status(500).json({
//       error,
//       message:
//         "Oops! Coś poszło nie tak, przy metodzie PUT w endpointcie /clients",
//     });
//   }
// };

exports.deleteClient = (request, response, next) => {
  try {
    Client.findByIdAndDelete(request.params.id, (err) => {
      if (err) {
        response.status(404).json({
          message: "Nie znaleziono klienta o podanym id",
        });
        return;
      }
      response.status(200).end();
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie DELETE w endpointcie /clients/:vatNo",
    });
  }
};

// exports.clientsData = clientsData;
// const findClients = Client.find();
// findClients.exec((err, data) => {
//   console.log(data);
// });
