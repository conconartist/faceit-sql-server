const Product = require('../models/product.model');

exports.create = (req, res) => {
  if (!req.body) {
      res.status(400).send({
          message: 'Content cannot be empty!'
      });
  } 
  const product = new Product({
    brand: req.body.brand, 
    name: req.body.name, 
    price: req.body.price, 
    price_sign: req.body.price_sign, 
    currency: req.body.currency, 
    image_link: req.body.image_link, 
    product_link: req.body.product_link, 
    website_link: req.body.website_link, 
    description: req.body.description, 
    product_type: req.body.product_type,
    cruelty_free: req.body.cruelty_free,
    fair_trade: req.body.fair_trade,
    organic: req.body.organic,
    vegan: req.body.vegan,
    zero_waste: req.body.zero_waste
  });

  Product.create(product, (err, data) => {
      if (err)
        res.status(500).send({
            message: 
              err.message || 'An error occurred while creating the Product.'
        });
      else res.send(data);
  })
};

exports.findAll = (req, res) => {
  Product.getAll((err, data) => {
      if (err)
        res.status(500).send({
            message: 
              err.message || 'An error occurred while retrieving products.'
        });
      else res.send(data);
  })
}

exports.findOne = (req, res) => {
  Product.findById(req.params.productId, (err, data) => {
      if (err) {
          if (err.kind === 'not_found') {
              res.status(404).send({
                  message: `Product with id ${req.params.productId} not found.`
              });
          } else {
              res.status(500).send({
                  message: `Error retrieving product with id ` + req.params.productId
              });
          }
      } else res.send(data);
  })
}

exports.update = (req, res) => {
  if(!req.body) {
      res.status(400).send({
          message: "Content cannot be empty!"
      });
  }

  Product.updateById(
      req.params.productId,
      new Product(req.body),
      (err, data) => {
          if (err) {
              if (err.kind === 'not_found') {
                  res.status(404).send({
                      message: `Product with id ${req.params.productId} not found.`
                  });
              } else {
                  res.status(500).send({
                      message: 'Error updating product with id ' + req.params.productId
                  });
              }
          } else res.send(data);
      }
  );
};

exports.delete = (req, res) => {
  Product.remove(req.params.productId, (err, data) => {
      if(err) {
          if (err.kind === 'not_found') {
              res.status(404).send({
                  message: `Product with id ${req.params.productId} not found.`
              });
          } else {
              res.status(500).send({
                  message: `Could not delete product with id ${req.params.productId}.`
              });
          }
      } else res.send({ message: `Product was deleted successfully.`})
  })
}

exports.deleteAll = (req, res) => {
  Product.removeAll((err, data) => {
      if (err) 
        res.status(500).send({
            message: 
              err.message || 'An error occurrred while removing all customers.'
        });
      else res.send({ message: `All products were deleted successfully.`})
  });
};