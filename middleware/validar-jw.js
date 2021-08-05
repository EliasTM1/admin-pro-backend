// Requerir express
const { response } = require('express')
// Requerir el JWT
const jwt = require('jsonwebtoken')
const validarJWT = (req, res = response, next) => {
    const token = req.header('x-token');

    console.log(token);

    if (!token) {
        res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        })
    }


    // Verificar el web token 

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        re.uid = uid;

        next();
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            ok: false,
            msg: "Token no valido",

        })
    }



}

module.exports = {
    validarJWT
}