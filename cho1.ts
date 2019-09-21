import {Dbo} from './db';
let sql ='select * from user';
Dbo.select(sql,(rs)=>{
    console.log(rs)
})

