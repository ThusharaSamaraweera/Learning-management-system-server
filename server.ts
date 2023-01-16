import dotenv from 'dotenv';
import http from 'http';
import app from './index';

dotenv.config()
const server = http.createServer(app)

server.listen(process.env.PORT, () => {
    console.log(`🚀 Server is now running on http://localhost:${process.env.PORT}`)
} )