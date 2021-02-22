const routes = require('./routes/index')
const cors = require('cors')
const cookieParser = require('cookie-parser');

const PORT = 8888

class Server {
  constructor(PORT, express, routes) {
    this._PORT = PORT
    this._express = express
    this._routes = routes
    this._app = this._express()
    this.start()
  }

  _settings() {
    this._app.use(this._express.static(__dirname + "\\authorization_code\\public"))
    this._app.use(this._express.json())
    this._app.use(cors())
    this._app.use(cookieParser())
    this._app.use(this._routes)
  }

  start() {
    this._settings()
    this._app.listen(this._PORT, err => {
      if (!err) {
        console.log(`Server running on PORT:${this._PORT}`)
        return true;
      }
      console.error(`Failed to start the server: ${err}`)
      return false;
    })
  }
}

const myApp = new Server(PORT, require('express'), routes)

module.exports = myApp