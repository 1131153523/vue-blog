const wrapper = require('co-mysql'),
    mysql = require('mysql')

const pool = mysql.createPool({
    host : 'localhost',
    port : 3306,
    database : 'website',
    user: 'root',
    password : 'root'
}), p = wrapper(pool);
module.exports = p
