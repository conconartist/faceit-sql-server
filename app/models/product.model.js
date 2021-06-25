// const { Router } = require('express');
const db = require('../database')

const { check, validationResult } = require('express-validator');
const productsData = require('../../productsData');

const Product = function(product) {
  this.brand = product.brand; 
  this.name = product.name;
  this.price = product.price; 
  this.price_sign = product.price_sign;
  this.currency = productsData.currency;
  this.image_link = product.image_link;
  this.product_link = product.product_link; 
  this.website_link = product.website_link;
  this.description = product.description; 
  this.product_type = product.product_type;
  this.cruelty_free = product.cruelty_free;
  this.fair_trade = product.fair_trade;
  this.organic = product.organic;
  this.vegan = product.vegan;
  this.zero_waste = product.zero_waste;
}

Product.create = (newProduct, result) => {
  db.query('INSERT INTO products SET ?', newProduct, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('created product: ', { id: res.insertId, ...newProduct });
    result(null, { id: res.insertId, ...newProduct });
  });
};

Product.findById = (productId, result) => {
  db.query(`SELECT * FROM products WHERE id = ${productId}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    
    if (res.length) {
      console.log('found product: ', res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: 'not_found' }, null);
  });
};

Product.getAll = result => {
  db.query('SELECT * FROM products', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('products: ', res);
    result(null, res);
  });
};

Product.updateById = (id, product, result) => {
  db.query(
    'UPDATE products SET brand = ?, name = ?, price = ?, price_sign = ?, currency = ?, image_link = ?, product_link = ?, website_link = ?, description = ?, product_type = ?, cruelty_free = ?, fair_trade = ?, organic = ?, vegan = ?, zero_waste = ? WHERE id = ?',
    [ product.brand, 
      product.name, 
      product.price, 
      product.price_sign, 
      product.currency, 
      product.image_link, 
      product.product_link, 
      product.website_link, 
      product.description, 
      product.product_type,
      product.cruelty_free,
      product.fair_trade,
      product.organic,
      product.vegan,
      product.zero_waste,
      id 
    ],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      if(res.affectedRows == 0) {
        result({ kind: 'not_found'}, null);
        return;
      }

      console.log('updated product: ', { id: id, ...product });
      result(null, { id: id, ...product });
    }
  );
};

Product.remove = (id, result) => {
  db.query('DELETE FROM products WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('deleted product with id: ', id);
    result(null, res);
  })
}

Product.removeAll = result => {
  db.query('DELETE FROM products', (err, res) => {
    if(err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log(`delted ${res.affectedRows} customers`);
    result(null, res);
  });
};

// const router = Router();

// router.use((req, res, next) => {
//     console.log(`Request made to /PRODUCTS ROUTE`);
//     next();
// })

// router.get('/', async (req, res) => {
//     const results = await db.promise().query(`SELECT * FROM PRODUCTS`);
//     res.status(200).send(results[0]);

// });

// router.get('/posts', (req, res) => {
//     res.json({ route: 'Posts' });
// });

// router.post('/', [ 
//     check('brand').notEmpty().withMessage('Brand cannot be empty.'),
//     check('brand').isLowercase().withMessage('Brand must be in lowercase letters.'),
//     check('name').notEmpty().withMessage('Name cannot be empty.'),
//     check('image_link').isURL().withMessage('Image Link needs a valid URL address.'),
//     check('product_link').isURL().withMessage('Product Link needs a valid URL address.'),
//     check('website_link').isURL().withMessage('Website Link needs a valid URL address.'),
//     check('product_type').notEmpty().withMessage('Product Type cannot be empty.'),
//     check('cruelty_free').isBoolean().withMessage('Cruelty Free value must be true or false.'),
//     check('fair_trade').isBoolean().withMessage('Fair Trade value must be true or false.'),
//     check('organic').isBoolean().withMessage('Organic value must be true or false.'),
//     check('vegan').isBoolean().withMessage('Vegan value must be true or false.'),
//     check('zero_waste').isBoolean().withMessage('Zero Waste value must be true or false.')
//   ], (req, res) => {

//     const errors = validationResult(req);
//     if(!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { 
//       brand, 
//       name, 
//       price, 
//       price_sign, 
//       currency, 
//       image_link, 
//       product_link, 
//       website_link, 
//       description, 
//       product_type,
//       cruelty_free,
//       fair_trade,
//       organic,
//       vegan,
//       zero_waste 
//     } = req.body;
//     if(brand && name) {
//       console.log(brand, name)
//       try {
//         db.promise().query(
//           `INSERT INTO PRODUCTS VALUES(NULL, '${brand}', '${name}', '${price}', '${price_sign}', '${currency}', '${image_link}', '${product_link}', '${website_link}', '${description}', '${product_type}', '${cruelty_free}', '${fair_trade}', '${organic}', '${vegan}', '${zero_waste}')`
//         );
//         res.status(201).send({ msg: 'Created Product' });
//       }
//       catch (err) {
//           console.log(err);
//       }
//     }
// })

//eventual table for full data: 
// app.post('/', (request, response) => {
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
//         product_type, 
//         tag_list
//     } = request.body;
//     app.locals.makeup.push({ id, brand, name, price, price_sign, currency, image_link, product_link, website_link, description, rating, category, product_type, tag_list });
//     response.status(201).json({ id, brand, name, price, price_sign, currency, image_link, product_link, website_link, description, rating, category, product_type, tag_list })
// })

//product_type: lipstick, eyeliner, mascara, lip_liner, blush, foundation, primer_concealer, eyebrow

// module.exports = router;

module.exports = Product;