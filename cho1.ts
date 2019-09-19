import {dbo} from './db';
dbo({
    sql:'select * from user',
    callback:(rs:any)=>{
       console.log(rs)
    }
})
dbo({
    sql:'select * from user',
    callback:(rs:any)=>{
        console.log(rs)
    }
})
dbo({
    sql:'select * from user',
    callback:(rs:any)=>{
        console.log(rs)
    }
})