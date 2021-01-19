const Marcadores = require("./marcadores");

class Sockets {
  constructor(io) {
    this.io = io;

    this.marcadores = new Marcadores();

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", (socket) => {
      console.log("cliente conectado");
      socket.emit("marcadores-activos", this.marcadores.activos);

      socket.on("marcador-nuevo", (marcador) => {
        // { id, lng, lat }
        console.log(marcador);
        this.marcadores.agregarMarcador(marcador);
        socket.emit("agrego-usuario", {data:'Hola mundo'});
        socket.broadcast.emit("marcador-nuevo", marcador);
      });

      socket.on("marcador-actualizado", (marcador) => {
        this.marcadores.actualizarMarcador(marcador);
        socket.broadcast.emit("marcador-actualizado", marcador);
      });
      
    });
  }
}

module.exports = Sockets;
