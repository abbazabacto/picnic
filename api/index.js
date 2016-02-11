var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var port = process.env.PORT || 8080;
var router = express.Router(); 
var products = require('./products');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.route('/products')
  .get(function(req, res){
    var filteredProducts = products
      .map(function(product){
        return {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image
        }
      });
    
    res.send(filteredProducts);
  });

router.route('/products/:productsId')
  .get(function(req, res){
    var productId = parseInt(req.params.productsId);
    var product = products
      .filter(function(product){ 
        return product.id === productId; 
      })
      .reduce(function(prev, cur){
        return cur ? cur : prev;
      }, {});
    
    res.send(product);
  });

app.use('/api/v1', router);

app.listen(port);

console.log('API running on: localhost://' + port + '/api/v1');
