// Servidor de Express
const express  = require('express');
const http     = require('http');
const socketio = require('socket.io');
const path     = require('path');
const bodyParser    = require('body-parser');
const io = require('./io');
const Sockets  = require('./sockets');
const cors = require('cors');
var myApp = '';
class Server {

    constructor() {

        this.app  = express();
        this.port = process.env.PORT;
        // Http server
        this.server = http.createServer( this.app );
        
        // Configuraciones de sockets
        this.io = socketio( this.server, { /* configuraciones */ } );
        myApp = this.io;
    }
    
    middlewares() {
        //Bodyparser
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        //CORS
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(express.json());
        // Desplegar el directorio público
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );
        //Cors

        //EndPoints
        //myApp = io.listen(this.io);
        this.app.use('/api/auth/',require('../routes/auth'));
    }

    // Esta configuración se puede tener aquí o como propieda de clase
    // depende mucho de lo que necesites
    configurarSockets() {
        //new Sockets( this.io );
        
      io.listen(this.io); 
    }

    execute() {

        // Inicializar Middlewares
        this.middlewares();

        // Inicializar sockets
        this.configurarSockets();

        // Inicializar Server
        this.server.listen( this.port, () => {
            console.log('Server corriendo en puerto:', this.port );
        });
    }

}


module.exports = Server;