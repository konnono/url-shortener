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
  ShortURL.find()
    .lean()
    .then(shorturls => {
      let short = generateShortURL()
      while (shorturls.find(urls => urls.short === short)) {
        console.log(`${short} already exist`)
        short = generateShortURL()
      }
      console.log(`${short} can be used`)

      const shortUrl = 'http://' + req.get('host') + '/' + short
      console.log(shortUrl)
      ShortURL.create({
        original: req.body.url,
        short: short
      })
      res.render('shorturls', { shortUrl })
    })
})

app.get('/:shorturl', (req, res) => {
  const key = req.params.shorturl
  ShortURL.findOne({ short: key })
    .lean()
    .then(shorturl => {
      console.log(shorturl)
      if (shorturl) {
        console.log(shorturl.original)
        res.redirect(shorturl.original)
      } else {
        const short = req.get('host') + '/' + key
        res.render('notfound', { shortUrl: short })
      }
    })
    .catch(err => { console.log(err) })
})

app.listen(port, () => {
  console.log(`Server is listening on port:${port}`)
})