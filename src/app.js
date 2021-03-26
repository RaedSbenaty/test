var path = require('path')
var express = require('express')
var hbs = require('hbs')
var geoCode = require('./utils/geoCode.js')
var forecast = require('./utils/forecast.js')

var app = express()
var port = process.env.PORT || 3000

var publicPath = path.join(__dirname, '../public')
var viewsPath = path.join(__dirname, '../templates/views')
var partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Raed Sbenaty'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Raed Sbenaty'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Raed Sbenaty',
        number: '0994418123'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address)
        return res.send({
            error: 'Provid an address'
        })

    var address = req.query.address

    geoCode(address, (error, { lat, lon, location } = {}) => {
        if (error)
            return res.send({ error })

        forecast(lat, lon, (error, forecastResponse) => {
            if (error)
                return res.send({ error })

            res.send({ address, location, forecastResponse })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error 404',
        name: 'Raed Sbenaty',
        message: 'No help article found'
    })
})
app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error 404',
        name: 'Raed Sbenaty',
        message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port: ' + port)
})