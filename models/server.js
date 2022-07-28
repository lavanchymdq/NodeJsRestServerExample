
const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.port = process.env.PORT;
        this.app = express();
        this.usersPath = '/api/users'

        // CONNECT TO DB
        this.connectDB();

        // Middleware
        this.middleware();

        this.routes();
    }

    async connectDB(){
        await dbConnection();
    }

    middleware() {
        // CORS
        this.app.use(cors());

        // Lectura del body
        this.app.use(express.json())

        // Directorios publicos
        this.app.use(express.static('public'));
    }

    routes() {
      this.app.use(this.usersPath, require('../routes/users.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
        })
    }
}

module.exports = Server;