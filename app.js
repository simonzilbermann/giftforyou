require('dotenv').config();
const express=require('express');

const app=express();
const cors=require('cors');
const morgan=require('morgan');
const mongoose=require('mongoose');
const hbs=require('hbs');
const path=require('path');
const cookieParser= require("cookie-parser");
 
const ManagerRouter=require('./api/v1/route/managers.js');
const PresRouter=require('./api/v1/route/presents.js');
const WorkRouter=require('./api/v1/route/workers.js');
const CategoryRouter=require('./api/v1/route/categories.js');
const Auth=require("./api/v1/middleware/auth");


const uri=process.env.CON_STR;
mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true}).then(
    ()=>{console.log("mongodb connect!")});

app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));
//app.set('views'.path.join(__dirname,'views'));
app.set('view engine','hbs');


app.use("/mang",ManagerRouter);

app.get('/wm',Auth,(req,res)=>{
    res.render('wm');
})
app.get('/loginWm',(req,res)=>{
    res.render('loginwm');
})
app.get('/recover',(req,res)=>{
    res.render('recoverpass');
})
app.get('/reset',(req,res)=>{
    res.render('resetpass');
})


if(LimitRenderPageByTime())
{
  
    
   // app.use("/product",Auths,ProductRouter);
    app.use("/pres",PresRouter);
    app.use("/work",WorkRouter);
    app.use("/cate",CategoryRouter);


    app.get('/win',(req,res)=>{
    res.render('winnergift');
    });

    app.get('/',(req,res)=>{
    
    res.render('index');
    });


    app.get('/leader',(req,res)=>{
        res.render('leader');
    });
 
 
}
else{
    require('./api/V1/controller/workers.js').SendGiftEmail();
    app.all('*',(req,res)=>{
        res.render('Expired');
    })
}



app.all('*',(req,res)=>{
    res.status(404).json({msg:"404 page not found"});





});
module.exports=app;
function LimitRenderPageByTime(){

    const myyear=process.env.YEAR;
    const mymonth=process.env.MONTH;
    const myday=process.env.DAY;
    let ts = Date.now();
    let date_ob = new Date(ts);
    let day = date_ob.getDate();
    let month = date_ob.getMonth() + 1;

    
    if(  month < mymonth){
        return true;
    }
    else if(month == mymonth && day <=myday){
        return true;
    }
    return false; 
}


