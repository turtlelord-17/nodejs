const express=require('express');
const port=3001;
const app=express();
const ejs=require('ejs');
const morgan=require('morgan');
let count=0;


//app.engine('ejs',ejs);
app.set('view engine','ejs');
app.set('views','./views');


const users=require('./routes/users');
const product=require('./routes/product');
const order=require('./routes/order')
const parser=require('body-parser');
const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://rohith33:rohith33@ro-60o66.mongodb.net/test?retryWrites=true&w=majority",function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("atlas connected")
    }
});

app.use(morgan('dev'));
app.use(parser.json());
app.use(parser.urlencoded({extended:true}));

app.use('*',function(req,res,next){
    res.set('Access-Control-Allow-Origin','*');
    res.set('Access-Control-Allow-Headers','content-type');
    next();
});


app.use('/users',users);
app.use('/product',product);
app.use('/order',order);


app.get('*',function(req,res,next){
count++;
next();


})


app.get('/',function(req,res){
    
    res.send('hello world').status(200);
});

app.get('/test',function(req,res){
    res.send('testing').status(204);
});
app.get('/count',function(req,res){
    res.send(count.toString()).status(204);
});

app.get('*',function(req,res){

res.send('not a valid shit').status(404);
});

app.listen(port,function(){
console.log(`server listenin on ${port}`);

})