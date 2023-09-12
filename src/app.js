const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//Paths for Express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const publicDirPath = path.join(__dirname, '../public')

//Handlebars setup
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static dir.
app.use(express.static(publicDirPath))


app.get('/', (req, res) => {
    res.render('index', {
        title: "Home",
        name: "BAxPI"
    })
})


app.get('/doc/', (req, res) => {
    res.render('documentation', {
        title: "Documentation",
        name: "BAxPI"
    })
})


app.get('/about/', (req, res) => {
    res.render('about', {
        title: "About Page",
        name: "BAxPI"
    })
})


app.get('/weather/', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: "Address must be provided."
        })
    }
    geocode(req.query.address, (error, {lat, lng, location} = {}) => {
        if (error) {
            return res.send({error})
        } 
        forecast(lat,lng, (error, data)=> {
            if (error) {
                return res.send({error})
            } else {
                res.send({
                    location,
                    data
                })
            }
        })
    })
})

// Error Pages
app.get('/help/me', (req, res) => {
    res.render('404', {
        title: "404",
        error: "Help article not found",
        name: "BAxPI"
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        error: 'Page not found.',
        name: "BAxPI"

    })
})

app.listen(3000, () => {
    console.log("Server is listening on port 3000.")
})
