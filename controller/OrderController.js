//const conn = require('../mariadb'); //db 모듈
const mariadb = require('mysql2/promise'); // mysql 모듈 (promise 버전)
const {StatusCodes} = require('http-status-codes'); //status code 모듈

// 주문 하기    
const order = async (req, res) => {
    const conn = await mariadb.createConnection({
            user : 'root',
            password : 'root',
            database : 'BookShop',
            dateStrings : true
    });

    const {items, delivery, totalQuantity, totalPrice, userId, firstBookTitle} = req.body;

    let delivery_id;
    let order_id;

    let sql = "INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?)";
    let values = [delivery.address, delivery.receiver, delivery.contact];

    let [result] = await conn.query(sql, values, 
        (err, results) => {
            if(err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end(); 
            }
            delivery_id = results.insertId;

    })  

    sql = `INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) 
            VALUES (?, ?, ?, ?, ?);`;
    values = [firstBookTitle, totalQuantity, totalPrice, userId, delivery_id];
    conn.query(sql, values, 
        (err, results) => {
            if(err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end(); 
            }

            order_id = results.insertId; 
    })

    sql = `INSERT INTO orderedBook(order_id, book_id, quantity)
            VALUES ?;`;

    //items.. 배열 : 요소들을 하나씩 꺼내서 (foreach문 돌려서)
    values = [];
    items.forEach((items) => {
        values.push([order_id, items.book_id, items.quantity]);
    })
    conn.query(sql, [values], 
        (err, results) => {
            if(err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end(); 
            }

            return res.status(StatusCodes.OK).json(results);
    })
}

const getOrders = (req, res) => {
    // 주문 목록 조회
    res.json('주문 목록 조회');
}

const getOrderDetail = (req, res) => {
    // 주문 상세 상품 조회
    res.json('주문 상세 상품 조회');
}

module.exports = {
    order,
    getOrders,
    getOrderDetail
}