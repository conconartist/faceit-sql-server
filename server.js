const express = require('express');
const cors = require('cors');
const app = express();
const productsData = require('./productsData.js');

app.set('port', process.env.PORT || 3002);
app.locals.makeup = productsData;

app.get('/api/v2/makeup', (request, response) => {
    response.status(200).json(app.locals.makeup)
})

app.use(express.json())
app.use(cors());

app.set('port', 3002)
app.listen(app.get('port'), () => {
    console.log(`Now listening on port ${app.get('port')}!`)
})

app.post('/api/v2/products', (request, response) => {
    const id = parseInt(app.locals.makeup.length + 1);
    const { 
        brand, 
        name, 
        price, 
        price_sign, 
        currency, 
        image_link, 
        product_link, 
        website_link, 
        description, 
        rating, 
        category, 
        product_type, 
        tag_list
    } = request.body;
    app.locals.makeup.push({ id, brand, name, price, price_sign, currency, image_link, product_link, website_link, description, rating, category, product_type, tag_list });
    response.status(201).json({ id, brand, name, price, price_sign, currency, image_link, product_link, website_link, description, rating, category, product_type, tag_list })
})