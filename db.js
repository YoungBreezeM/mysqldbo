"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("mysql"));
var config_1 = require("./config");
// //创建连接池
var pool = mysql_1.default.createPool({
    host: config_1.dbConfig.host,
    user: config_1.dbConfig.user,
    password: config_1.dbConfig.password,
    database: config_1.dbConfig.database,
    port: config_1.dbConfig.port,
});
pool.on('connection', function () {
    console.log('创建一个连接');
});
//当一个回掉压入队伍等待连接的时候触发入队事件
pool.on('enqueue', function () {
    console.log('入队');
});
pool.on('release', function (connection) {
    console.log('Connection %d released', connection.threadId);
});
function dbo(option) {
    if (option.sql) {
        pool.getConnection(function (c_err, conn) {
            if (c_err)
                throw c_err;
            else {
                if (option.callback) {
                    conn.query(option.sql, function (err, result) {
                        if (err)
                            throw err;
                        else {
                            //释放连接
                            conn.release();
                            // setTimeout(()=>{
                            //     //当用户离开记得断开连接
                            //     // pool.end()
                            // },3000)
                            //返回数据
                            option.callback(result);
                        }
                    });
                }
                else if (option.value && option.callback) {
                    conn.query(option.sql, option.value, function (err, result) {
                        if (err)
                            throw err;
                        else {
                            //释放连接
                            conn.release();
                            //返回数据
                            option.callback(result);
                        }
                    });
                }
                else {
                    throw new Error('option is error');
                }
            }
        });
    }
    else {
        throw new Error("sql cant empty");
    }
}
exports.dbo = dbo;
//# sourceMappingURL=db.js.map