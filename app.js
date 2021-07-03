const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

const generateShortURL = require('./helpers/generateShortURL')
require('./config/mongoose')

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const url = generateShortURL()
  res.send(generateShortURL())
})

app.listen(port, () => {
  console.log(`Server is listening on port:${port}`)
})