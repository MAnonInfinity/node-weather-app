const express = require('express')
const path = require('path')
const hbs = require('hbs')

const { geocode } = require('./utils/geocode')
const { forecast } = require('./utils/forecast')

const app = express()
const publicDirPath = path.join(__dirname, '../public')
const viewsDirPath = path.join(__dirname, '../templates/views')
const partialsDirPath = path.join(__dirname, '../templates/partials')

// set up static directory to serve
app.use(express.static(publicDirPath))

// set up handlebars (hbs) engine & views (folder) location
app.set('view engine', 'hbs')  // hbs templating engine
app.set('views', viewsDirPath)
hbs.registerPartials(partialsDirPath)

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Manan Varma'
    })
})

app.get('/about', (req, res) => {
    // res.sendFile(path.join(__dirname, '../public/about.html'))
    res.render('about', {
        title: 'About Me',
        name: 'Manan Varma'
    })
})

app.get('/help', (req, res) => {
    // res.sendFile(path.join(__dirname, '../public/help.html'))
    res.render('help', {
        title: 'Help Page',
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.location) 
        return res.send({
            error: 'You must provide a location!'
        })

    // res.send({
    //     forecast: 'Lightning and Rain',
    //     location: req.query.location,
    // })
        
    geocode(req.query.location, (error, { latitude, longitude, location } = {}) => {
        if (error)
            return res.send({ error })  
        forecast(latitude, longitude, (error, forecastData) => {
            if (error)
                return res.send({ error })
            res.send({
                location,
                forecast: forecastData
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search)
        return res.send({
            error: 'You must provide a search'
        })

    console.log(req.query.search)

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: '404. Help article not found'
    })
})

// 404 page, * is a wildcard, this needs to come at last
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found'
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})