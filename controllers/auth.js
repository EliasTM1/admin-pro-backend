// con esto podemos acceder a los metodos que se encuentran dentro del response
const { response } = require("express");
// Para la encriptacion de la contrasena 
const bcrypt = require('bcryptjs');
// Requerimos el schema del usuario
const Usuario = require('../models/usuario');
// Generar el web Token
const { generarJWT } = require('../helpers/jwt')
const login = async (req, res = response) => {
    // Llegando a este punto sabemos que la informacion viene validada
    // el mail es valido y la contrasena existe
    // Del body de la respuesta extraemos el password y el mail
    const { email, password } = req.body;
    try {

        const usuarioDB = await Usuario.findOne({ email });

        // Verificar email
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Correo no encontrado'
            });
        }

        // Verificar contrasena
        const validPassword = bcrypt.compareSync(password, usuarioDB.password)

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            });
        }

        // Generar el TOKEN - JWT
        const token = await generarJWT(usuarioDB.id)
        // Generar el TOKEN - JWT

        res.json({
            ok: true,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
};

module.exports = {
    login
}