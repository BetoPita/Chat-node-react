const Mensajes = require("../models/index").Mensajes;
const {Sequelize} = require('sequelize');
const {or} = Sequelize.Op;
const obtenerChat = async (req, res) => {
  const miId = req.uid;
  const mensajesDe = req.params.de;
  const mensajesDB = await Mensajes.findAll({
    where: {
      [or]: [
        { de: miId,para: mensajesDe },{ de: mensajesDe,para: miId },
      ],
    },
    order:[
        ['createdAt','asc']
    ],
    limit : 30,
    //attributes: ['id', 'logo_version', 'logo_content_type', 'name', 'updated_at']
  });
  
  res.json({
    ok: true,
    miId,
    mensajesDe,
    mensajes: mensajesDB,
  });
};
module.exports = {
  obtenerChat,
};
