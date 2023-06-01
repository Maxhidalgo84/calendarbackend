const mongoose = require('mongoose');


const dbConnection = async() => {

    try{
        await mongoose.connect(process.env.DB_CNN);
        //mongoose.set('strictQuery', true)
        console.log("db_online");

    }catch (error) {
        console.log(error)
    }
}

module.exports = {
    dbConnection
}