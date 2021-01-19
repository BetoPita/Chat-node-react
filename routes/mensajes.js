const {Router} = require('express');
const { obtenerChat } = require('../controllers/mensajesController');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

/*
 path: api/mensajes
*/

router.get('/:de',validarJWT,obtenerChat)
module.exports = router;