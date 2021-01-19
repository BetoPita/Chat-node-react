/* Controllers */
const usuarioController = require('../controllers/userControllerBK');
const {Router} = require('express');
const { createUser,login,renewToken } = require('../controllers/loginController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.get('/list',usuarioController.list);

//app.post('/api/usuario/create/username/:username/status/:status', usuarioController.create);

router.post('/create',[
    check('nombre','El nombre es requerido').not().isEmpty(),
    check('email','El correo es requerido').not().isEmpty(),
    check('email','El correo debe ser una dirección válida').isEmail(),
    check('password','La contraseña es requerida').not().isEmpty(),
    validarCampos,
],createUser);

router.post('/login',[
    check('email','El correo es requerido').not().isEmpty(),
    check('email','El correo debe ser una dirección válida').isEmail(),
    check('password','La contraseña es requerida').not().isEmpty(),
    validarCampos,
],login);
router.get('/renew',validarJWT,renewToken)

module.exports = router;