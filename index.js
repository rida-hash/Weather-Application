const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
  res.sendFile(__dirname+ "/index.html");
})

app.post('/', function(req, res){
  var query = req.body.query;
  var url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&appid=80508ac50aae8a2e09e6a2b34ae5a845";
  https.get(url, function(response){
    console.log(response);

    response.on("data", function(data){
      var weatherTemp = JSON.parse(data);
      var temp =weatherTemp.main.temp;
      var descr = weatherTemp.weather[0].description;
      const icon = weatherTemp.weather[0].icon;
      var link = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      console.log(temp);
      console.log(descr);
      res.write("<h1>The temperature in "+query+" today is "+temp+"</h1><br><h2>The Weather is "+descr+"</h2>");
      res.write("<img src="+link+">");
      res.send();
    })
  })
})

app.listen(3000, function(){
  console.log('Server runnign on port 3000');
})
