const express = require('express');
const { json } = require('express/lib/response');

const https = require('https')

const app = express();

const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=e372a354bb5da64b774c410dcaa6f4ef&units=metric"

https.get(url, function (response) {
    console.log(response.statusCode);

    response.on('data', function(data){ 
    //console.log(data);  printing in hexadecimal wihout code below
    const weatherData = JSON.parse(data)
    const tempInfo = weatherData.main.temp
    const weatherInfo = weatherData.weather[0].description

    console.log(`Temperature in London is currently ${tempInfo} Celsius with ${weatherInfo}`)  
    
    })
})

app.get("/", function (req, res) {
    res.send('Server is up and running!')
})


app.listen(3000, function () {
    console.log('Server is running on port 3000.');
})