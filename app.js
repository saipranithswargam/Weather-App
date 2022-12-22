require('dotenv').config();
const { json } = require('express');
const express = require('express');

const ejs = require('ejs');

const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

const favicon = require('serve-favicon');

app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.set('view engine', 'ejs');

const https = require('https');


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.post("/",(req,res)=>{
    const city = req.body.Cityname;
    const apiKey = process.env.API_KEY;
    const units = "metric"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    https.get(url,(response)=>{
        if(response.statusCode==200){
        response.on("data",(data)=>{
            // console.log(data);//here the format that we get is in hexadciaml now we parse and get js objects
            const weatherData = JSON.parse(data);
            const icon = "http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";
            // console.log(weatherData);
            // console.log(weatherData.visibility)
            // res.write("<h1>The temperature in " +city+ " is "+weatherData.main.temp +"</h1>")
            // res.write(weatherData.weather[0].description);
            // res.write("<img src="+icon+"></img>");
            const temper= weatherData.main.temp;
            const place = weatherData.name;
            const des = weatherData.weather[0].description;
            res.render("result",{temp:temper,place:place,des:des,icon:icon});
      })
}
        else{
            res.sendFile(__dirname+"/error.html");  
        }
})
    
  
})


app.post("/error",(req,res)=>{
    res.redirect("/");
})
app.post("/result",(req,res)=>{
    res.redirect('/');
})


app.listen(process.env.PORT||3000,()=>{
    console.log("server has started on port 3000");
})