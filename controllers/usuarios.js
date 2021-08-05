const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt')

// Traer a los usuarios
const getUsuarios = async (req, res) => {
    // El string que tiene nombre email role y google sirve como un filtro para obtener solo estos campos en la respuesta
    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok: true,
        usuarios,
        uid: req.uid
    })
};


// Crear un nuevo usuario
const crearUsuario = async (req, res = response) => {
    // Destructuramos las propiedades que vienen dentro de la respuesta del body
    const { email, password } = req.body;

    try {
        // Validar si existe el email
        const existeEmail = await Usuario.findOne({ email })

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        // Creamos una nueva instancia de usuario con los datos que vienen dentro de la respuesta
        const usuario = new Usuario(req.body)
        // Encripat la contraseña antes de guardar en la base de datos
        const salt = bcrypt.genSaltSync();
        // Asignamos la contrasena encriptada como la contrasena que se guardara en la base de datos
        usuario.password = bcrypt.hashSync(password, salt);
        // Generar el webtoken del usuario
        const token = await generarJWT(usuario.id)
        // Guardar en la base de datos
        await usuario.save();

        res.json({
            ok: true,
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        })
    }
};

const actualizarUsuario = async (req, res = response) => {

    //  Extraer el id del usuario y lo almacenamos en uid
    const uid = req.params.id;
    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "No existe un usuario por ese id"
            })
        }

        // Si se llega aqui significa que el usuario existe
        // Actualizar y eliminar los datos que no se quieren sobreEscribir
        const { password, google, email, ...campos } = req.body;

        if (usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: "Ya existe un usuario con este email"
                });
            }
        }

        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });


        res.json({
            ok: true,
            usuarioActualizado
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: "Hubo un error al actializar el usuario"
        })
    }
}


const borrarUsuario = async (req, res = response) => {

    // Tenemos que tomar el parametro que viene de la ruta, en este caso el id del usuario, esto viene en la respuesta, y se tiene que almacenar en una variable 

    const uid = req.params.id;


    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "No existe un usuario con ese ID"
            })
        }

        await Usuario.findOneAndDelete(uid);

        res.status(200).json({
            ok: 'Es correcto',
            msg: 'El ususario fue borrado',
            uid
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admon'
        });
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}