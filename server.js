import express from 'express'

import { Liquid } from 'liquidjs';

const app = express()

app.use(express.urlencoded({extended: true}))

app.use(express.static('public'))

const engine = new Liquid()
app.engine('liquid', engine.express())

app.set('views', './views')

app.get('/', async function (request, response) {
  response.render('index.liquid')
})

app.get('/lampen', async function (request, response) {
  const producten = await fetch('https://fdnd-agency.directus.app/items/vdle_lamps')
  const productenJSON = await producten.json()

  response.render('producten.liquid', {
    producten: productenJSON.data,
  })
})

app.get('/schakelmateriaal', async function (request, response) {
  response.render('schakelmateriaal.liquid', {

  })
})

app.get('/contact', async function (request, response) {
  response.render('contact.liquid', {

  })
})

app.get('/winkelwagen', async function (request, response) {
  response.render('winkelwagen.liquid', {
    
  })
})

app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
  console.log(`Daarna kun je via http://localhost:${app.get('port')}/ jouw interactieve website bekijken.\n\nThe Web is for Everyone. Maak mooie dingen 🙂`)
})
