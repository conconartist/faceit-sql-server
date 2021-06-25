const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

// const productsRoute = require('./routes/product.model');
// const postsRoute = require('./routes/posts');

//middleware:

// app.use(express.json())
// app.use(cors());
// app.use(express.urlencoded({extended: false}), )

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

// app.use((req, res, next) => {
//   console.log(`${req.method} = ${req.url}`)
//   next();
// })

// app.use('/products', productsRoute);
// app.use('/posts', postsRoute);

app.get('/', (req, res) => {
  res.json({message: 'Welcome to the faceit server.'})
})
app.listen(3000, () => {
    console.log(`Now listening on port 3000!`)
})

// app.locals.products = productsData;

// app.get('/', (request, response) => {
//     return response.status(200).json(app.locals.products)
// })



