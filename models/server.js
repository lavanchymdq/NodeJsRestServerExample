
const express = require('express');
var cors = require('cors');

class Server {

    constructor() {
        this.port = process.env.PORT;
        this.app = express();
        this.usersPath = '/api/users'

        // Middleware
        this.middleware();

        this.routes();
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