const { usuarioConectadoDesconectado, getUsuarios, grabarMensajes } = require("../controllers/sockets");
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
        //socket no identificado
        return socket.disconnect();
      }
      await usuarioConectadoDesconectado(uid,true);
      //Unir al usuario a una sala de socket.io
      socket.join(uid);

      //Validar JWT
      //Si el token no es válido desconectar

      //Saber que usuario está activo mediante el UID

      //Emitir todos los usuarios conectados
      this.io.emit('lista-usuarios',await getUsuarios())

      //Unirme a una sala Socket join uid

      //Escuchar cuando el cliente manda mensaje mensaje-personal
      socket.on('mensaje-personal',async(payload) => {
        const mensaje = await grabarMensajes(payload)
        console.log('para',payload.para);
        this.io.to(payload.para).emit('mensaje-personal',mensaje);
        this.io.to(payload.de).emit('mensaje-personal',mensaje);
      })
      // Disconnect (marcar en base de datos que usuario se desconectó)
      socket.on('disconnect',async() => {
        await usuarioConectadoDesconectado(uid,false);
        this.io.emit('lista-usuarios',await getUsuarios())
        console.log('cliente desconectado');
      })
      
      
    });
  }
}

module.exports = Sockets;
