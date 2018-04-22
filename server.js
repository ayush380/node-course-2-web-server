const express=require('express');
const fs=require('fs');
const hbs=require('hbs');
var app=express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

app.use((req,res,next)=>{
  var now=new Date().toString();
  var log=`${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n',(err)=>{
    if(err){
      console.log('unable to append to server.log');
    }
  });
  next();
});
app.use((req,res,next)=>{
  res.render('maintenance.hbs');
});

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

app.get('/',(req,res)=>{
  // res.send("<h1>hello express</h1>");
  // res.send({
  //   name:"Ayush",
  //   likes:[
  //     'Music',
  //     'lol'
  //   ]
  res.render('home.hbs',{
    pageTitle:'Root Page',
    currentYear:new Date().getFullYear(),
    welcomeMessage:'Hello Niggers'
  });
});
app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About Page'
    // currentYear:new Date().getFullYear()
  });
});

app.get('/bad',(req,res)=>{
  res.send({
    error:"Bad request"
  })
})
app.listen(3000,()=>{
  console.log("server is up");
});
