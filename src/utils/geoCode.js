const request = require('request');
var geoCode = (address, callback) => {
    var url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoicmFlZHNiZW5hdHkiLCJhIjoiY2ttNnNqYzBoMGY2azJwbXo2Y2Z4cWl3diJ9.bGhLjLgKSFeccPPe3ieSWg"

    request({ url, json: true }, (error, { body } = {}) => {
        if (error)
            return callback('Connection error', undefined)

        if (!body.features.length)
            return callback('Input error', undefined)

        var data = {
            lon: body.features[0].center[0],
            lat: body.features[0].center[1],
            location: body.features[0].place_name
        }
        callback(undefined, data)
    })
}

module.exports = geoCode
