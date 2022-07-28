const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION);
        console.log('DB online.')
    } catch (err) {
        throw new Error('Error initializing DB: ',err);
    }
}

module.exports = {
    dbConnection
}