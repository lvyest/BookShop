// mysql 모듈 
const mariadb = require('mysql2');

// DB와 연결 통로 생성
const connection = mariadb.createConnection({
    host : '127.0.0.1',
    user : 'root',
    password : 'root',
    database : 'BookShop',
    dateStrings : true
});

module.exports = connection;