const { Router } = require('express');
const db = require('../database')

const { check, validationResult } = require('express-validator');

const router = Router();

router.use((req, res, next) => {
    console.log(`Request made to /PRODUCTS ROUTE`);
    next();
})

router.get('/', async (req, res) => {
    const results = await db.promise().query(`SELECT * FROM PRODUCTS`);
    res.status(200).send(results[0]);

});

router.get('/posts', (req, res) => {
    res.json({ route: 'Posts' });
});

router.post('/', [ 
    check('brand').notEmpty().withMessage('Brand cannot be empty.'),
    check('name').notEmpty().withMessage('Name cannot be empty.'),
    check('product_type').notEmpty().withMessage('Product Type cannot be empty.'),
    check('cruelty_free').notEmpty().withMessage('Cruelty Free value must be true or false.'),
    check('fair_trade').notEmpty().withMessage('Fair Trade value must be true or false.'),
    check('organic').notEmpty().withMessage('Organic value must be true or false.'),
    check('vegan').notEmpty().withMessage('Vegan value must be true or false.'),
    check('zero_waste').notEmpty().withMessage('Zero Waste value must be true or false.')
  ], (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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
      product_type,
      cruelty_free,
      fair_trade,
      organic,
      vegan,
      zero_waste 
    } = req.body;
    if(brand && name) {
      console.log(brand, name)
      try {
        db.promise().query(
          `INSERT INTO PRODUCTS VALUES(NULL, '${brand}', '${name}', '${price}', '${price_sign}', '${currency}', '${image_link}', '${product_link}', '${website_link}', '${description}', '${product_type}', '${cruelty_free}', '${fair_trade}', '${organic}', '${vegan}', '${zero_waste}')`
        );
        res.status(201).send({ msg: 'Created Product' });
      }
      catch (err) {
          console.log(err);
      }
    }
})

//eventual table for full data: 
// app.post('/', (request, response) => {
//     const { 
//         brand, 
//         name, 
//         price, 
//         price_sign, -- error message if string is more than one character
//         currency, 
//         image_link, 
//         product_link, 
//         website_link, 
//         description, 
//         rating,  
//         product_type, 
//         tag_list
//     } = request.body;
//     app.locals.makeup.push({ id, brand, name, price, price_sign, currency, image_link, product_link, website_link, description, rating, category, product_type, tag_list });
//     response.status(201).json({ id, brand, name, price, price_sign, currency, image_link, product_link, website_link, description, rating, category, product_type, tag_list })
// })

module.exports = router;