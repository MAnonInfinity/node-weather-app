const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const API_KEY = '5fa563e6ae4b352d118e3dc389beb2f2'
    const URL = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${latitude},${longitude}&units=m`

    request({ url: URL, json: true }, (err, res) => {
        if (err)
            callback('Unable to connect to the weather service', null)
        else if (res.body.error) {
            callback(res.body.error.info, null)
        }
        else {
            const currentData = res.body.current
            callback(null, `${currentData.weather_descriptions[0]}. It is currently ${currentData.temperature} degrees Celcius out, feels like ${currentData.feelslike} degrees Celcius out.`)}    
    })
}

module.exports = {
    forecast
}