// path /api/login
const { Router } = require('express');
// Requerir el controlador del auth
const { login } = require('../controllers/auth');
// Requerir el middleware check
const { check } = require('express-validator');
// Validar los campos
const { validarCampos } = require('../middleware/validar-campos');
// Requerir el JWT 

const router = Router();


router.post('/',
    [
        check('email', 'El mail es obligatorio').isEmail(),
        check('password', 'La contransena es obligatoria').not().isEmpty(),
        validarCampos

    ],
    login
);


module.exports = router;