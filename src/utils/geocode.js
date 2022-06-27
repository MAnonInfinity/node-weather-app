const request = require('request')

const geocode = (location, callback) => {
    const API_KEY = 'pk.eyJ1IjoibWFub25sb2wiLCJhIjoiY2w0djNyazZ1MDFtbDNkcXNncHJuNGZkOCJ9.O_xJwAEwE8hDRYGNVdgBBg'
    const URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${API_KEY}&limit=1`

    request({ url: URL, json: true }, (err, res) => {
        if (err)
            callback('Unable to connect to the location service')
        else if (!res.body.features.length) {
            callback('Unable to find location, try another search')
        }
        else {
            callback(null, {
                latitude: res.body.features[0].center[1],
                longitude: res.body.features[0].center[0],
                location: res.body.features[0].place_name
            })
        }
    })
}

module.exports = {
    geocode
}