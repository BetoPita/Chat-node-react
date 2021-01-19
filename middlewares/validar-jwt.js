const jwt = require('jsonwebtoken');
const validarJWT = (req,res,next) => {
    try {
        const token = req.header('x-token');
        if(!token){
            return res.status(401).json({
                ok:false,
                msg: 'No hay token en la petición'
            })
        }
        const payload = jwt.verify(token,process.env.JWT_KEY);
        req.uid = payload.uid
        // res.json({
        //     ok:true,
        //     payload
        // })
        next();
    } catch (error) {
        res.status(401).json({
            ok:false,
            msg : 'Token no es correcto'
        })
    }
}
module.exports = {
    validarJWT
}