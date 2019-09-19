import mysql from "mysql";
import {dbConfig} from './config'
// //创建连接池
let pool =mysql.createPool({
    host:dbConfig.host,
    user:dbConfig.user,
    password:dbConfig.password,
    database:dbConfig.database,
    port:dbConfig.port,

});
pool.on('connection',function(){
    console.log('创建一个连接');
});

//当一个回掉压入队伍等待连接的时候触发入队事件
pool.on('enqueue',function(){
    console.log('入队');
});
pool.on('release', function (connection:any) {
    console.log('Connection %d released', connection.threadId);
});
/**
 *@namespace dbo 重载数据操作原
 * @param sql 进行sql操作的语句
 * @param value 要进行操作的数据
 * @callback 数据回调
 * */
interface sqlOption {
    sql:string,
    callback:any,
    value?:Array<string|number>

}
export function dbo(option:sqlOption){
    if(option.sql){
        pool.getConnection((c_err,conn)=>{//连接不成功
            if(c_err)
                throw c_err;
            else {//通过连接操作数据库
                if(option.callback){
                    conn.query(option.sql,(err,result)=>{
                        if(err)
                            throw err;
                        else{
                            //释放连接
                            conn.release();
                            // setTimeout(()=>{
                            //     //当用户离开记得断开连接
                            //     // pool.end()
                            // },3000)
                            //返回数据
                            option.callback(result)
                        }
                    })
                }else if(option.value&&option.callback){
                    conn.query(option.sql,option.value,(err,result)=>{
                        if(err)
                            throw err;
                        else{
                            //释放连接
                            conn.release();
                            //返回数据
                            option.callback(result)
                        }
                    })
                }else {
                    throw new Error('option is error')
                }
            }
        })
    }else {
        throw new Error("sql cant empty")
    }
}
