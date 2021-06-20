const { Router } = require('express');
const db = require('../database')
const router = Router();

router.use((req, res, next) => {
    console.log(`Request made to /PRODUCTS ROUTE`);
    next();
})

router.get('/', (req, res) => {
    res.send(200);
});

router.get('/posts', (req, res) => {
    res.json({ route: 'Posts' });
});

router.post('/', (req, res) => {
    const { brand, name } = req.body;
    if(brand && name) {
      console.log(brand, name)
      try {
        db.promise().query(`INSERT INTO PRODUCTS VALUES(NULL, '${brand}', '${name}')`);
        res.status(201).send({ msg: 'Created Product' });
      }
      catch (err) {
          console.log(err);
      }
    }
})

module.exports = router;