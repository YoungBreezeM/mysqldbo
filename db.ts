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
export class Dbo {
    public static select(sql:string,callback:any):void{
        this.dboopt2(sql,callback);
    };
    private static dboopt2(sql:string,callback:any):void{
        pool.getConnection((c_err,conn)=>{//连接不成功
            if(c_err)
                throw c_err;
            else {//通过连接操作数据库
                conn.query(sql,(err,result)=>{
                    if(err)
                        throw err;
                    else{
                        //释放连接
                        conn.release();
                        //返回数据
                        callback(result)
                    }
                })
            }
        })
    };
    private static dboopt3(sql:string,value:Array<string|number>,callback:any):void{
        pool.getConnection((c_err,conn)=>{//连接不成功
            if(c_err)
                throw c_err;
            else {//通过连接操作数据库
                conn.query(sql,value,(err,result)=>{
                    if(err)
                        throw err;
                    else{
                        //释放连接
                        conn.release();
                        //返回数据
                        callback(result)
                    }
                })
            }
        })
    }
}