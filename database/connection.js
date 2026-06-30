const mysql = require('mysql2');

const credentials = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

console.log(credentials);

const connection = mysql.createConnection(credentials);

connection.connect((err) => {
    if(err) {
        console.error('Error connecting to the database', err);
        return;
    }
    console.log('Connect to the database');
})

module.exports = connection;