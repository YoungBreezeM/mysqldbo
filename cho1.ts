import {dbo} from './db';
let sql ='select * from user';
dbo(sql,(rs)=>{
    console.log(rs)
});
