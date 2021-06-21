const mysql = require('mysql2');

module.exports = mysql.createConnection({
    host: '127.0.0.1',
    user: 'newuser',
    password: 'WillThisWork?876',
    database: 'SampleTable',
})