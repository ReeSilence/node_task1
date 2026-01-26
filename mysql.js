require('dotenv').config();
const mysql = require("mysql2");

connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
}).promise();

connection.connect(function(err){
    if (err) {
      return console.error("Ошибка подключения: " + err.message);
    }
    else{
      console.log("Подключение к MySQL успешно установлено (DB: article)");
    }
});
module.exports = connection;