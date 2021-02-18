const { v4: uuid } = require("uuid");
// const Client = require("../models/client");

// new Admin({ login: "...", password: "... }).save();

// const getData = (req, res, next) => {
//   new Client({
//     companyName: "test",
//     companyAdress: "testowy 22, 00-00 Test",
//     vatNo: "PL1231231223",
//     eMail: "testowy@testowy.pl",
//     info: "testowe info",
//   }).save();

//   Client.find({}, (err, data) => {
//     usersData.login = data[0].login;
//     usersData.password = data[0].password;
//   });
// };
// getData();

const clientsData = [
  {
    companyName: "test",
    companyAdress: "testowy 22, 00-00 Test",
    vatNo: "PL1231231223",
    eMail: "testowy@testowy.pl",
    info: "testowe info",
  },
];

exports.getClients = (request, response, next) => {
  try {
    response.status(200).json({
      clients: clientsData,
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie GET w endpointcie /courses",
    });
  }
};

exports.getClient = (request, response, next) => {
  try {
    const { vat } = request.params;
    const clientToSend = clientsData.find((client) => client.vatNo === vatNo);

    if (!clientToSend) {
      response.status(404).json({
        message: "Nie znaleziono klienta o podanym numerze nip",
      });

      return;
    }

    response.status(200).json({
      client: clientToSend,
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie GET w endpointcie /courses/:id",
    });
  }
};

exports.postClient = (request, response, next) => {
  try {
    const { companyName, companyAdress, vatNo, eMail, info } = request.body;
    if (!companyName || !companyAdress || !vatNo || !eMail) {
      response.status(400).json({
        message: "Nie podano wszystkich wymaganych informacji",
      });

      return;
    }

    const isClientExist = Client.some(
      ({ vatNo: currentVatNo }) => currentVatNo === vatNo
    );
    if (isClientExist) {
      response.status(409).json({
        message: `Klient o podanym numerze nip: ${title} istnieje w bazei danych`,
      });

      return;
    }

    const newCourse = {
      id: uuid(),
      companyName,
      companyAdress,
      eMail,
      info,
    };

    clientsData.push(newCourse);

    response.status(201).json({
      clients: clientsData,
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie POST w endpointcie /courses",
    });
  }
};

exports.putClient = (request, response, next) => {
  try {
    const { authors, id, price, title } = request.body;
    if (!authors || !id || !price || !title) {
      response.status(400).json({
        message: "Nie podano wszystkich wymaganych informacji",
      });

      return;
    }

    const indexCourseToUpdate = clientsData.findIndex(
      (client) => client.vatNo === vatNo
    );
    if (indexClientToUpdate === -1) {
      response.status(404).json({
        message: "Nie znaleziono klienta o podanym numerze nip",
      });

      return;
    }

    clientsData.splice(indexCourseToUpdate, 1, request.body);

    response.status(202).json({
      clients: clientsData,
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie PUT w endpointcie /courses",
    });
  }
};

exports.deleteClient = (request, response, next) => {
  try {
    const { vatNo } = request.params;

    console.log(vatNo);
    const indexClientToDelete = clientsData.findIndex(
      (client) => client.id === id
    );

    if (indexClientToDelete === -1) {
      response.status(404).json({
        message: "Nie znaleziono klienta o podanym numerze nip",
      });

      return;
    }

    clientsData.splice(indexClientToDelete, 1);
    response.status(200).end();
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie DELETE w endpointcie /courses/:id",
    });
  }
};

exports.clientsData = clientsData;
