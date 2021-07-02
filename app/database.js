const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'us-cdbr-east-04.cleardb.com',
    user: 'b8725e8f7c4ff3',
    password: 'ad940409',
    database: 'heroku_2153ef9d82d21ac',
})

connection.connect(error => {
    if(error) throw error;
    console.log("Successfully connected to database.")
})

module.exports = connection;