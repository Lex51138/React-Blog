module.exports = {
    host:process.env.HOST || 'localhost',
    port:process.env.PORT ||(process.env.NODE_ENV === 'production'?8080:7777),
    apiHost:process.env.APIHOST || 'localhost',
    apiPort:process.env.APIPORT || '8791',
    dbHost:"47.107.187.0",
    dbPort:"37017",
    app:{
        title:"personal blog",
        description:'Nealyang\'s personal blog demo',
        head:{
            titleTemplate:'blog',
            meta:[
                {
                    name:"description",
                    content:"react express demo"
                },
                {charset:"utf-8"}
            ]
        }
    }
};