const express = require('express');
const res = require('express/lib/response');
const {json} = require('express/lib/response');
const bodyParser = require('body-parser')

const https = require('https');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {

    res.sendFile(__dirname + '/index.html')
});

app.post("/", function (req, res) {

    const query = req.body.cityName;

    //const apiKey = 'Your API goes here';

    const unit = 'metric';

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;


    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on('data', function(data) {
            //console.log(data); //printing in hexadecimal wihout code below
            const weatherData = JSON.parse(data)
            const tempInfo = weatherData.main.temp
            const weatherInfo = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = 'https://openweathermap.org/img/wn/' + icon + '@2x.png'

            res.write(`<h1>Temperature in ${query} is currently ${tempInfo} Celsius with ${weatherInfo}</h1>`)
            res.write('<img src=' + imageURL + '>');
            res.send()

        })
    })

})



app.listen(3000, function () {
    console.log('Server is running on port 3000.');
})
