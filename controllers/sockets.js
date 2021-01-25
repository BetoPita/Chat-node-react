const Usuario = require("../models/index").Usuario;
const Mensaje = require("../models/index").Mensajes;
const usuarioConectadoDesconectado = async (uid,estado) => {
  const usuario = await Usuario.findOne({
    where: {
      id: uid,
    },
  });

  await usuario.update({
    online: estado,
  });
  return usuario;
};

const getUsuarios = async() => {
    const usuarios = await Usuario.findAll({
        order:[
            ['online','Desc']
        ]
    });
    //console.log(usuarios);
    return usuarios;
}

const grabarMensajes = async(payload) => {
    try {
        const mensaje = await Mensaje.create(payload)
        return mensaje;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    usuarioConectadoDesconectado,
    getUsuarios,
    grabarMensajes
};
