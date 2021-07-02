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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}!`)
})



