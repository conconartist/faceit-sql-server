const express = require('express');
// const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

const productsRoute = require('./routes/products');
const postsRoute = require('./routes/posts');
const productsData = require('./productsData.js');

//middleware:

app.use(express.json())
// app.use(bodyParser.json());
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
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
    // response.send({
    //     msg: 'Hello',
    //     product: {}
    // })
})

// app.set('port', process.env.PORT || 3307);

// app.listen(app.get('port'), () => {
//     console.log(`Now listening on port ${app.get('port')}!`)
// })

//eventual table for full data: 
// app.post('/', (request, response) => {
//     const id = parseInt(app.locals.makeup.length + 1);
//     const { 
//         brand, 
//         name, 
//         price, 
//         price_sign, 
//         currency, 
//         image_link, 
//         product_link, 
//         website_link, 
//         description, 
//         rating, 
//         category, 
//         product_type, 
//         tag_list
//     } = request.body;
//     app.locals.makeup.push({ id, brand, name, price, price_sign, currency, image_link, product_link, website_link, description, rating, category, product_type, tag_list });
//     response.status(201).json({ id, brand, name, price, price_sign, currency, image_link, product_link, website_link, description, rating, category, product_type, tag_list })
// })
