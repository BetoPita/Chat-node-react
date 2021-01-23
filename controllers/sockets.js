const Usuario = require("../models/index").Usuario;
const usuarioConectadoDesconectado = async (uid,estado) => {
  const usuario = await Usuario.findOne({
    where: {
      id: uid,
    },
  });

  usuario.update({
    online: estado,
  });
  return usuario;
};

module.exports = {
    usuarioConectadoDesconectado,
};
