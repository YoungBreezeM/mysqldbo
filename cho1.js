"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("./db");
var sql = 'select * from user';
db_1.Dbo.select(sql, function (rs) {
    console.log(rs);
});
//# sourceMappingURL=cho1.js.map