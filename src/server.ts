import dotenv from 'dotenv';
import http from 'http';
import app from './index';
import { mongoDBconnect } from "./data/database/mongodb/connection";

dotenv.config()
const server = http.createServer(app)
mongoDBconnect();
server.listen(process.env.PORT, () => {
    console.log(`🚀 Server is now running on http://localhost:${process.env.PORT}`)
} )