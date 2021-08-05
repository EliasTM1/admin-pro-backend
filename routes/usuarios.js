// Ruta: /api/usuarios
const { Router, application } = require('express');
// Requerir express validator
const { check } = require('express-validator')
// Requerir el archivo dentro de la carpeta de controladores que se llama usuarios.js
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
// Requerir nuestro middleware
const { validarCampos } = require('../middleware/validar-campos')
// Validar el JWT
const { validarJWT } = require('../middleware/validar-jw')
// Se crea una instancia del router
const router = Router();


// El argumento que se manda despues de la ruta se encuentra dentro del archivo de controladores
router.get('/', validarJWT, getUsuarios);

router.put('/:id',

    [
        validarJWT,
        check('nombre', 'El nombre es necesario para continuar').not().isEmpty(),
        check('password', 'El password es necesario para continuar').not().isEmpty(),
        check('email', 'El emaail es necesario para continuar').not().isEmail(),
        validarCampos
    ],
    actualizarUsuario);

router.post('/',
    // Aqui se definen loss middlewares, si es uno no s enecesitan las llaves, se pueden agregar multiples si se aagregan dentro de un array

    // Como segundo argumento al check podemos enviar un mensaje personalizado con el error
    [
        check('nombre', 'El nombre es necesario para continuar').not().isEmpty(),
        check('role', 'El role es necesario para continuar').not().isEmpty(),
        check('email', 'El emaail es necesario para continuar').isEmail(),
        validarCampos
    ],
    crearUsuario);



router.delete(
    '/:id',
    borrarUsuario,
    validarJWT
)


module.exports = router;