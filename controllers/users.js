const Login = require("../models/login");

const usersData = {
  accessLevel: true,
  login: "",
  password: "",
};

const getData = (req, res, next) => {
  Login.find({}, (err, data) => {
    usersData.login = data[0].login;
    usersData.password = data[0].password;
  });
};
getData();

exports.postUser = (request, response, next) => {
  try {
    const { login, password } = request.body;
    const user = usersData.accessLevel;
    if (usersData.login !== login) {
      response.status(404).json({
        message: "Użytkownik o podanym loginie nie istnieje",
      });

      return;
    }

    const isPasswordCorrect = usersData.password === password;
    if (!isPasswordCorrect) {
      response.status(401).json({
        message: "Hasło lub login się nie zgadza",
      });

      return;
    }

    response.status(200).json({
      user,
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie POST w endpointcie /users",
    });
  }
};
