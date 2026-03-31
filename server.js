import express from 'express'

import { Liquid } from 'liquidjs';

import session from 'express-session'


const app = express()

app.use(session({
  secret: 'supergeheim123', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}))

app.use(express.urlencoded({extended: true}))

app.use(express.static('public'))

const engine = new Liquid()
app.engine('liquid', engine.express())

app.set('views', './views')

app.get('/', async function (request, response) {
  response.render('index.liquid', {
    winkelwagenAantal: request.session.winkelwagen ? request.session.winkelwagen.length : 0
  })
})

app.get('/lampen', async function (request, response) {
  const producten = await fetch('https://fdnd-agency.directus.app/items/vdle_lamps')
  const productenJSON = await producten.json()

  response.render('lampen.liquid', {
    producten: productenJSON.data,
  })
})

app.get('/lamp/:id', async function (request, response) {
  const id = request.params.id

  const product = await fetch(`https://fdnd-agency.directus.app/items/vdle_lamps/${id}`)
  const productJSON = await product.json()

  response.render('lamp.liquid', {
    product: productJSON.data,
  })
})

app.get('/winkelwagen', async function (request, response) {
  const winkelwagen = request.session.winkelwagen || []

  response.render('winkelwagen.liquid', {
    winkelwagen: winkelwagen
  })
})

app.post('/winkelwagen/toevoegen', function (request, response) {
  const productId = request.body.id;
  
  if (!request.session.winkelwagen) {
    request.session.winkelwagen = [];
  }

  const bestaandProduct = request.session.winkelwagen.find(item => item.id === productId);

  if (bestaandProduct) {
    bestaandProduct.aantal += 1;
  } else {
    const nieuwProduct = {
      id: productId,
      name: request.body.name,
      base_price: request.body.base_price,
      aantal: 1
    };
    request.session.winkelwagen.push(nieuwProduct);
  }

  response.redirect('/winkelwagen');
})

app.get('/schakelmateriaal', async function (request, response) {
  response.render('schakelmateriaal.liquid', {
  })
})

app.get('/electrotechniek', async function (request, response) {
  response.render('electrotechniek.liquid')
})

app.get('/gordijnrails', async function (request, response) {
  response.render('gordijnrails.liquid')
})

app.get('/contact', async function (request, response) {
  response.render('contact.liquid', {
  })
})

app.get('/login', async function (request, response) {
  response.render('login.liquid', {
  })
})

app.get('/admin', async function(request, response) {
  response.render('admin.liquid', {
  })
})

app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
  console.log(`Daarna kun je via http://localhost:${app.get('port')}/ jouw interactieve website bekijken.\n\nThe Web is for Everyone. Maak mooie dingen 🙂`)
})
