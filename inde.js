// Requerir express
const express = require('express');
// Requerir el archivo de configuracion de la base de datos
const { dbConection } = require('./database/config');
require('dotenv').config()
// Requerir cors 
const cors = require('cors');




// Crear el servidor express (instancia)
const app = express();

// Configurar CORS
app.use(cors());

// Variables de entorno
// Cuando se realizan variables de entorno se tienen que guardar los cambios
// console.log(process.env)


// Base de datos 
dbConection();

app.get('/', (res, req) => {
    res.status(400).json({
        ok: true,
        msg: 'Hola mundo'
    })
})

// Mongo credentials 
// mean_db username
// SQsGmK0TF4gGQSr1 paassword


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo dentro del servidor' + process.env.PORT)
});