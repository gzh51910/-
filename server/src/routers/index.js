const express = require('express');

let Router = express.Router();
const {token,formatData} = require('../utils')
let loginRouter = require('./login');
let goodsRouter = require('./goods');
let homeRouter = require('./home');
let forumRouter = require('./forum');
let userRouter = require('./user');
// let regRouter = require('./reg');
// let proxyRouter = require('./proxy');

// 跨域解决方案CORS
Router.use((req,res,next)=>{
    // 支持CORS跨域，只需要设置响应头
    // res.header('Access-Control-Allow-Origin','*');
    let currentOrigin = req.get('Origin');
    let allowOrigin = ['http://182.92.109.17:4564','http://182.92.109.17:4565','http://localhost:5858']
    if(allowOrigin.includes(currentOrigin)){
        res.set({
            'Access-Control-Allow-Origin':currentOrigin,
            'Access-Control-Allow-Methods':'GET,POST,PUT,PATCH,DELETE,OPTIONS',
            'Access-Control-Allow-HEADERS':"Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
        })
        
    }
    // 跨域请求CORS中的预请求
    if(req.method=="OPTIONS") {
        res.sendStatus(200);/*让options请求快速返回*/
    } else{
        next();
    }
})





// 格式化请求体中的参数
Router.use(express.json(),express.urlencoded({extended:false}));


// Router.use('/proxy',proxyRouter)
Router.use('/goods',goodsRouter)
Router.use('/home',homeRouter)
Router.use('/login',loginRouter)
Router.use('/forum',forumRouter)
Router.use('/user',userRouter)
// token验证
Router.get('/verify',(req,res)=>{
    // 获取请求头上的token
    console.log("verify","成功");
    
    let Authorization = req.get('Authorization');
    console.log(Authorization);
    
    if(token.verify(Authorization)){
        res.send(formatData())
    }else{
        res.send(formatData({status:0}))
    }
})

module.exports = Router;