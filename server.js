const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//middleware:

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.json({message: 'Welcome to the faceit server.'})
})

require('./app/routes/product.routes')(app);
app.listen(3000, () => {
    console.log(`Now listening on port 3000!`)
})

// app.locals.products = productsData;

// app.get('/', (request, response) => {
//     return response.status(200).json(app.locals.products)
// })



