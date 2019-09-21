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
/**
 *@namespace dbo 重载数据操作原
 * @param sql 进行sql操作的语句
 * @param value 要进行操作的数据
 * @callback 数据回调
 * */
var Dbo = /** @class */ (function () {
    function Dbo() {
    }
    Dbo.select = function (sql, callback) {
        this.dboopt2(sql, callback);
    };
    ;
    Dbo.dboopt2 = function (sql, callback) {
        pool.getConnection(function (c_err, conn) {
            if (c_err)
                throw c_err;
            else {
                conn.query(sql, function (err, result) {
                    if (err)
                        throw err;
                    else {
                        //释放连接
                        conn.release();
                        //返回数据
                        callback(result);
                    }
                });
            }
        });
    };
    ;
    Dbo.dboopt3 = function (sql, value, callback) {
        pool.getConnection(function (c_err, conn) {
            if (c_err)
                throw c_err;
            else {
                conn.query(sql, value, function (err, result) {
                    if (err)
                        throw err;
                    else {
                        //释放连接
                        conn.release();
                        //返回数据
                        callback(result);
                    }
                });
            }
        });
    };
    return Dbo;
}());
exports.Dbo = Dbo;
//# sourceMappingURL=db.js.map