var express = require('express');
var router = express.Router();
var socketApi = require("../socketApi");

// Database Name
const dbName = 'myproject';

const MongoClient = require('mongodb').MongoClient;

var conn = MongoClient.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true });




/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET chat messages. */
router.get('/chat', function (req, res, next) {
  conn.then(client => {

    client.db(dbName).collection("documents").find({}).toArray((err, info) => {
      res.send(info);
    });


  });
});

//{ author: 'addas', text: 'sdasddas' }
router.post('/chat', function (req, res) {

  // Permite obtener el parámetro indicado en el path
  let bo = req.body;
  socketApi.sendNotification(bo);
  // Similar al módulo http, establece el contenido de la respuesta del servicio
  res.send(bo);

});

module.exports = router;
