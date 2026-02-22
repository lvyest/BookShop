// mysql 모듈 
const mariadb = require('mysql2/promise');

// DB와 연결 통로 생성
const connection = async () => {
    const conn = await mariadb.createConnection({
        user : 'root',
        password : 'root',
        database : 'BookShop',
        dateStrings : true
    });
}

module.exports = connection;