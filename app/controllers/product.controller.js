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