"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("./db");
db_1.dbo({
    sql: 'select * from user',
    callback: function (rs) {
        console.log(rs);
    }
});
db_1.dbo({
    sql: 'select * from user',
    callback: function (rs) {
        console.log(rs);
    }
});
db_1.dbo({
    sql: 'select * from user',
    callback: function (rs) {
        console.log(rs);
    }
});
//# sourceMappingURL=cho1.js.map