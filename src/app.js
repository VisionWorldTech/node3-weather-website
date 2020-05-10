const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('request')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

//Define Paths for Express Config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//Setup handlebars engines and view locations
app.set('views',viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

//Setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
  res.render('index',{
    title: 'Weather',
    name: 'Dhruv Singh'
  })
})

app.get('/about',(req,res) => {
  res.render('about',{
    title: 'About Me',
    name: 'Dhruv Singh'
  })
})

app.get('/help',(req,res) => {
  res.render('help',{
    title: 'Help Page',
    name: 'Dhruv Singh'
  })
})

app.get('/weather',(req, res) => {
    if(!req.query.address){
      return res.send({
        error: 'You must provide an address!'
      })
    }
    // console.log(req.query.address)
    geocode (req.query.address, (error, {latitude, longitude, location}= {}) => {
      if (error){
        return res.send({error})
      }
      forecast(latitude, longitude, (error, forecastdata) => {
          if(error){
            return res.send({error})
          }
          res.send({
            Forecast: forecastdata,
            Location: location,
            Address: req.query.address
          })
          console.log('Location', location)
          // console.log('Error', error)
          console.log(forecastdata)
      })
    })
})

app.get('/products',(req,res) =>{
  // console.log(req.query.search)
  if(!req.query.search){
    return res.send({
      error:'You must provide a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products: []
  })

})
//app.com
//app.com/help
//app.com/about

app.get('/help/*', (req,res) => {
  res.render('404',{
    title: 'Lost Help',
    name: 'Help Article Not Found'
  })
})

app.get('*',(req,res) => {
  res.render('404',{
    title: 'Page Not Found',
    name: '404 Error'
  })
})


app.listen(3000, () => {
  console.log('Server is Up on port 3000.')
})

