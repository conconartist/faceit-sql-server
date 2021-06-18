const mysql = require('mysql2');

module.exports = mysql.createConnection({
    host: 'localhost:3002',
    user: 'root',
    password: 'WillThisWork?876',
    database: 'sampleTable'
})