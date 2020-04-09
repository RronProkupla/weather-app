const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/33f655e9933dc3e13a5f1ab4e9c684e5/' + latitude + ',' + longitude + '?units=auto'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            let time = new Date(body.currently.time *1000)
                time = time.toTimeString().split(" ")[0]
            callback(undefined,{
                        summary: body.daily.data[0].summary,
                        temp: body.currently.temperature , 
                        precip: body.currently.precipProbability,
                        time: time
                    })
        }
    })
}

module.exports = forecast