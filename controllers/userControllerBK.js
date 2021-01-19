const Sequelize = require("sequelize");
const models = require("../models/index");
const io = require('../config/io');
module.exports = {
  create(req, res) {
    return models.Usuario.create({
      username: req.body.username,
      status: req.body.status,
    })
      .then((usuario) => {
        io.test();
        //console.log(usuario);
        res.status(200).send(usuario);
      })
      .catch((error) => {
        console.log('error',error);
      });
  },
  list(_, res) {
    return models.Usuario.findAll({})
      .then((usuario) => res.status(200).send(usuario))
      .catch((error) => res.status(400).send(error));
  },
  find(req, res) {
    return usuario
      .findAll({
        where: {
          username: req.params.username,
        },
      })
      .then((usuario) => res.status(200).send(usuario))
      .catch((error) => res.status(400).send(error));
  },
};
