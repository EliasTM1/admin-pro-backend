const mongoose = require('mongoose');


const dbConection = async () => {


    // Mongo credentials 
    // mean_db username
    // SQsGmK0TF4gGQSr1 paassword

    try {
        await mongoose.connect(process.env.MONGOENTORNO, {
            usedNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('DB online')
    } catch (error) {
        console.log(error);
        throw new Error('Problemas')
    }

}

module.exports = {
    dbConection
}