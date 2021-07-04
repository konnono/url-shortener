const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('./node_modules/body-parser')

const app = express()
const port = 3000

const generateShortURL = require('./helpers/generateShortURL')
const ShortURL = require('./models/shortURL')
require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  // console.log(req.body.url)
  const short = generateShortURL()
  const shortUrl = req.get('host') + '/' + short
  console.log(shortUrl)
  ShortURL.create({
    original: req.body.url,
    short: short
  })
  res.render('shorturls', { shortUrl })
})

app.listen(port, () => {
  console.log(`Server is listening on port:${port}`)
})