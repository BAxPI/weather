const request = require('request')

// data.weather_descriptions[0] + ". It is currently", data.temperature, "out. It feels like ", data.feelslike, "degrees out."

const forecast = (lat, lng, callback) =>{
    const url = "http://api.weatherstack.com/current?access_key=bc99d32eff8c59fc8ace8a3f4751d1ae&query=" + lat + "," + lng 
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback("Couldn't connect to weather service", undefined)
        } else if (body.error){
            callback('Unable to find location')
        } else {
            callback(undefined,body.current.weather_descriptions[0] + ". It is currently " + 
                    body.current.temperature + " out. It feels like " +
                    body.current.feelslike + " degrees out.")
        }
    })
}

module.exports = forecast