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
export function dbo(sql:string):object
export function dbo(sql:string,value:Array<string|number>,callback:any):object
export function dbo(sql:string,callback?:any):object
export function dbo():any {
    let lenCol = [
        {//长度为0的处理函数
            "defult":function(){
                throw new Error("args is cant empty");
            }
        },
        {//1
            "string": ({sql}:any)=>{
                throw new Error('must has a callback')
            }
        },
        {//2
            "string-function": ({sql,callback}:any)=>{
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
            }
        },
        {//3
            "string-object-function": ({sql,value,callback}:any)=>{
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
    ];
    let typeCol:any ='';//类型拼接缓存
    let args ={sql:null,value:null,callback:null}//数据项缓存
    for(let i=0;i<arguments.length;i++){
        if(i==arguments.length-1)
            typeCol += typeof arguments[i];
        else
            typeCol += typeof arguments[i]+'-'

        if(typeof arguments[i]==='string'){
            args.sql = arguments[i];
        }else if (typeof arguments[i]==='object'){
            args.value = arguments[i];
        }else {
            args.callback = arguments[i];
        }
    }
    if(arguments.length>0)//根据数据类型和参数个数运行相应的方法
        lenCol[arguments.length][typeCol](args);
    else
        throw new Error("args is cant empty");
};