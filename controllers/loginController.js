const { response } = require("express");
const Usuario = require("../models/index").Usuario;
const bcrypt = require("bcrypt");
const { generarJWT } = require("../helpers/jwt");
const login = async (req, res = response) => {
  try {
    const { email, password } = req.body;
    const user = await Usuario.findOne({
      where: {
        email: email,
        //password: req.body.password,
      },
    });
    if (user === null) {
      res.status(404).send({
        exito: false,
        mensaje: "El usuario no se encuentra registrado",
      });
    } else {
      //Validar el password
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({
          exito: false,
          mensaje: "El email o contraseña no son correctos",
        });
      }
      const token = await generarJWT(user.id);
      res.status(200).send({
        exito: true,
        usuario: user,
        token,
      });
    }
  } catch (error) {
    res.status(500).send({
      exito: false,
      mensaje: "Error en el server",
    });
  }
};
const createUser = async (req, res = response) => {
  const salt = bcrypt.genSaltSync();
  try {
    const { email, password, nombre } = req.body;
    const [user, created] = await Usuario.findOrCreate({
      where: { email: email },
      defaults: {
        email,
        password: bcrypt.hashSync(password, salt),
        nombre,
      },
    });
    const token = await generarJWT(user.id);
    if (created) {
      res.status(200).send({
        exito: true,
        usuario: user,
        mensaje: "El usuario se creó con éxito",
        token,
      });
    } else {
      res.status(200).send({
        exito: false,
        mensaje: "El usuario ya se encuentra registrado",
      });
    }
  } catch (error) {
    res.status(200).send({
      exito: true,
      usuario: user,
      mensaje: "Error en el servidor " + error,
    });
  }
};
const renewToken = async(req,res) => {
    const uid = req.uid;
    //Generar JWT
    const token = await generarJWT(uid);
    //Obtener el usuario por uid
    const usuario = await Usuario.findOne({
        where: {
          id: uid,
        }
      });

    res.json({
        exito:true,
        usuario,
        token
    })
    
}
module.exports = {
  createUser,
  login,
  renewToken
};
