const db = require('../database')

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

//product_type: lipstick, eyeliner, mascara, lip_liner, blush, foundation, primer_concealer, eyebrow

module.exports = Product;