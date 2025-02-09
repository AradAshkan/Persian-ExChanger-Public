const mysql = require('mysql2');
let connection;

function connectToDatabase() {
    if (connection) return connection;
    connection = mysql.createConnection({
        host: 'Your_Host_Name',
        user: 'Your_User_Name',
        password: 'Your_Password',
        database: 'Your_Database_Name',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
    connection.connect(err => {
        if (err) {
            console.error('Error connecting to the database:', err.stack);
            return;
        }
        console.log('Connected to the database as id ' + connection.threadId);
        console.log('ـــــــــــــــ');
    });
    return connection;
}

module.exports = { connectToDatabase };