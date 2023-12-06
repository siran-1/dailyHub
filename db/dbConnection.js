const mysql2 = require('mysql2');

const connection = mysql2.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '!Naruto2023',
    database: '',
    port: 3306
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

module.exports = connection;
