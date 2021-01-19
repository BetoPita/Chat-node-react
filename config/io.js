const socketio = require("socket.io");
const Marcadores = require("./marcadores");
let io;

function listen(io) {
    const marcadores = new Marcadores();
  //io = socketio.listen(app);
  io.on("connection", function (socket) {
    console.log("cliente conectado");
     socket.emit("marcadores-activos", marcadores.activos);

    socket.on("marcador-nuevo", (marcador) => {
      // { id, lng, lat }
      console.log(marcador);
      marcadores.agregarMarcador(marcador);
      socket.emit("agrego-usuario", {data:'Hola mundo'});
      socket.broadcast.emit("marcador-nuevo", marcador);
    });

    // socket.on("marcador-actualizado", (marcador) => {
    //   marcadores.actualizarMarcador(marcador);
    //   socket.broadcast.emit("marcador-actualizado", marcador);
    // });
    socket.on("agrego-usuario", () => {
      console.log("estoy listo!");
    });
  });

  return io;
}
function test(){
    io.on("connection", function (socket) {
        socket.emit("agrego-usuario", {data:'Hola mundo'});
        console.log('emití');
    });
}

module.exports = {
  listen,
  test,
  io,
};
