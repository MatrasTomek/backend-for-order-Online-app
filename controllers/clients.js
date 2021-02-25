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

// get one client from DB by vatNo
exports.getClient = (request, response, next) => {
  try {
    const { vatNo } = request.params;

    const findClient = Client.find({ vatNo: vatNo });
    findClient.exec((err, data) => {
      if (data.length === 0 || data === null) {
        response.status(404).json({
          message: "Nie znaleziono klienta o numerze nip:",
        });
        return;
      }
      response.status(200).json({
        client: data,
      });
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie GET w endpointcie /clients/:vatNo",
    });
  }
};

// add client to DB from addClientFrom
exports.postClient = (request, response, next) => {
  const body = request.body;
  const newClient = new Client(body);

  newClient.save((err, data) => {
    if (err) {
      console.log(body, err);
      return;
    }
    response.status(201).json({
      data,
    });
  });
};
// edit and change data of client
exports.putClient = (request, response, next) => {
  try {
    const {
      clientId,
      companyName,
      companyAdress,
      vatNo,
      eMail,
      info,
    } = request.body;

    const filter = clientId;
    const update = {
      companyName,
      companyAdress,
      vatNo,
      eMail,
      info,
    };

    Client.findByIdAndUpdate(clientId, update, { new: true }, (err, data) => {
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
// delete one client by _id
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
