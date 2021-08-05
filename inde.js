require('dotenv').config()
// Requerir express
// Requerir cors 
const cors = require('cors');
const express = require('express');
// Requerir el archivo de configuracion de la base de datos
const { dbConection } = require('./database/config');

// Crear el servidor express (instancia)
const app = express();

// Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json())

// Variables de entorno
// Cuando se realizan variables de entorno se tienen que guardar los cambios
// console.log(process.env)

// Base de datos 
dbConection();

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
// Ruta de autenticacion de usuario (LOGIN)
app.use('/api/login', require('./routes/auth'))

// Mongo credentials 
// mean_db username
// SQsGmK0TF4gGQSr1 paassword

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo dentro del servidor' + process.env.PORT)
});