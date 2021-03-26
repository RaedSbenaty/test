const request = require('request');

var forecast = (lat, lon, callback) => {
    const options = {
        method: 'GET',
        url: 'https://weatherbit-v1-mashape.p.rapidapi.com/current',
        json: true,
        qs: { lon, lat },
        headers: {
            'x-rapidapi-key': '0f7f267e0amshcfc0acc0af11046p1681bdjsn3dbe5d7950b1',
            'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com',
            useQueryString: true
        }
    };

    request(options, (error, { body } = {}) => {
        if (error)
            return callback('Connection error', undefined)

        if (body.error)
            return callback(body.error, undefined)

        var data = body.data[0]
        callback(undefined, data.weather.description)
    })
}

module.exports = forecast