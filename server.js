const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const productsData = require('./productsData.js');

app.use(express.json())
app.use(bodyParser.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.locals.products = productsData;

app.get('/', (request, response) => {
    return response.status(200).json(app.locals.products)
})

app.set('port', process.env.PORT || 3002);

app.listen(app.get('port'), () => {
    console.log(`Now listening on port ${app.get('port')}!`)
})

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