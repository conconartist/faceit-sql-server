const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'newuser',
    password: 'WillThisWork?876',
    database: 'SampleTable',
})

connection.connect(error => {
    if(error) throw error;
    console.log("Successfully connected to database.")
})

module.exports = connection;