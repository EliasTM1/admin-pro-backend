const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {
    // Creamos una nueva proomesa para poder usar el async y el await
    return new Promise((res, rej) => {
        // Creamos el payload que servira como argumento para nuestro JWT
        const payload = {
            uid
        };
        // El primer argumento es el paylod
        // Segundo argumento es la variable de ambiente que definimos en .env
        // El tercer argumento es el tiempo que tarda el web token en expirar
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (err, token) => {
            if (err) {
                // En caso de que el web token no se pueda generar
                console.log(err);
                rej('No se pudo generar el JWT');
            } else {
                // JWT creado
                res(token);
            }
        });
    });

};

// Exportamos la funcion para poder hacer uso de ella de manera global
module.exports = {
    generarJWT
}