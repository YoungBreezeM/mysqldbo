interface dbConfig {//mysql数据配置接口
    database:string,
    host:string,
    port:number,
    user:string,
    password:string
}

export let dbConfig:dbConfig = {
    database:"fw",
    host:'localhost',
    port:3306,
    user:'admin',
    password:'root'
}
