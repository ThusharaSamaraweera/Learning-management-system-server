import mysql from 'mysql2';
require('dotenv').config()

//@ts-ignore
export const connection = mysql.createConnection({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

connection.connect((err) => {
    if(!err)   {
        console.log('Connected')
    }else {
        console.error(err)
    }
})

module.exports = connection