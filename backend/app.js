const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');


if(process.env.NODE_ENV!=='development'){
    require("dotenv").config({path:"backend/config/config.env"});
}

//Using Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

//Importing routes
const postRouter=require('./routes/post');
const userRouter=require('./routes/user');


//Using Routes
app.use('/api/v1',postRouter);
app.use('/api/v1',userRouter);
module.exports=app;