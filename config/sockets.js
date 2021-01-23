const { usuarioConectadoDesconectado } = require("../controllers/sockets");
const { comprobarJWT } = require("../helpers/jwt");
const Marcadores = require("./marcadores");

class Sockets {
  constructor(io) {
    this.io = io;

    this.marcadores = new Marcadores();

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", async(socket) => {
      console.log("cliente conectado");
      ;
      const [valido,uid] = comprobarJWT(socket.handshake.query['x-token']);
      if(!valido){
        console.log('socket no identificado');
        return socket.disconnect();
      }
      const usuario = await usuarioConectadoDesconectado(uid,true);
      console.log('se conectó',usuario.nombre);
      //Validar JWT
      //Si el token no es válido desconectar

      //Saber que usuario está activo mediante el UID

      //Emitir todos los usuarios conectados

      //Unirme a una sala Socket join uid

      //Escuchar cuando el cliente manda mensaje mensaje-personal

      // Disconnect (marcar en base de datos que usuario se desconectó)
      socket.on('disconnect',async() => {
        await usuarioConectadoDesconectado(uid,false);
        console.log('cliente desconectado');
      })
      
      
    });
  }
}

module.exports = Sockets;
