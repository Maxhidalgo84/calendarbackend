const express = require('express');
require('dotenv').config();
//const  cors = require('cors')
const { dbConnection }= require('./DB/config')

//console.log(process.env);

//crear servidor express

const app = express();

//base de datos
dbConnection();

//cors
//app.use(cors())

//Directorio publico
app.use( express.static('public'))


//lectura y parseo body
app.use(express.json())

//Rutas
//TODO auth // crear,login, renew
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events',require('./routes/events'));


//TODO CRUD: Eventos







//escuchar peticiones
app.listen(process.env.PORT, ()=> {
    console.log(`servidor corriendo en puerto ${process.env.PORT} `);
})