const jwt = require("jsonwebtoken");

const models = require("../models");
const Users = models.users;

exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  Users.findOne({ where: { email } })
    .then(user => {
      if (password == user.password) {
        const token = jwt.sign({ id: user.id }, "my-secret-key");
        res.send({
          login: true,
          id: user.id,
          email: user.email,
          token
        });
      } else {
        res.send({
          login: false,
          message: "Wrong Email or Password Invalid !"
        });
      }
    })
    .catch(err => {
      res.send({
        login: false,
        message: "Login Invalid, You are not registered"
      });
    });
};

exports.register = (req, res) => {
  Users.create({
    email: req.body.email,
    password: req.body.password
  })
    .then(data => {
      if (data) {
        const token = jwt.sign({ id: data.id }, "my-secret-key");
        res.send({
          id: data.id,
          email: data.email,
          token
        });
      }
    })
    .catch(() => {
      res.send({
        error: true
      });
    });
};
