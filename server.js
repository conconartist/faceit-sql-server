const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

//middleware:

app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.json({message: 'Welcome to the faceit server.'})
})

require('./app/routes/product.routes')(app);
app.listen(3000, () => {
    console.log(`Now listening on port 3000!`)
})



