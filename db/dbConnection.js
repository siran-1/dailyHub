const mysql2 = require('mysql2');

const connection = mysql2.createConnection({
    host: 'database-1.cmh26ou85r5h.us-east-1.rds.amazonaws.com',
    user: 'root',
    password: '!Naruto2023',
    database: 'dailyhub',
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
