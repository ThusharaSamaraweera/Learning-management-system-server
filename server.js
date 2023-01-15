import * as dotenv from 'dotenv'
const http = require('http');
const app = require('./index')

dotenv.config()
const server = http.createServer(app)
server.listen(process.env.PORT)