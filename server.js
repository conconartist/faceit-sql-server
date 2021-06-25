const express = require('express');

const app = express();
const cors = require('cors');

const productsRoute = require('./routes/product.model');
const postsRoute = require('./routes/posts');
const productsData = require('./productsData.js');

//middleware:

app.use(express.json())
app.use(cors());
app.use(express.urlencoded({extended: false}), )

app.use((req, res, next) => {
  console.log(`${req.method} = ${req.url}`)
  next();
})

app.use('/products', productsRoute);
app.use('/posts', postsRoute);

app.listen(3000, () => {
    console.log(`Now listening on port 3000!`)
})

app.locals.products = productsData;

app.get('/', (request, response) => {
    return response.status(200).json(app.locals.products)
})



