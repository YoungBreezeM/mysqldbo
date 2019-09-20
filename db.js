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
function dbo() {
    var lenCol = [
        {
            "defult": function () {
                throw new Error("args is cant empty");
            }
        },
        {
            "string": function (_a) {
                var sql = _a.sql;
                throw new Error('must has a callback');
            }
        },
        {
            "string-function": function (_a) {
                var sql = _a.sql, callback = _a.callback;
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
            }
        },
        {
            "string-object-function": function (_a) {
                var sql = _a.sql, value = _a.value, callback = _a.callback;
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
            }
        }
    ];
    var typeCol = ''; //类型拼接缓存
    var args = { sql: null, value: null, callback: null }; //数据项缓存
    for (var i = 0; i < arguments.length; i++) {
        if (i == arguments.length - 1)
            typeCol += typeof arguments[i];
        else
            typeCol += typeof arguments[i] + '-';
        if (typeof arguments[i] === 'string') {
            args.sql = arguments[i];
        }
        else if (typeof arguments[i] === 'object') {
            args.value = arguments[i];
        }
        else {
            args.callback = arguments[i];
        }
    }
    if (arguments.length > 0)
        lenCol[arguments.length][typeCol](args);
    else
        throw new Error("args is cant empty");
}
exports.dbo = dbo;
;
//# sourceMappingURL=db.js.map