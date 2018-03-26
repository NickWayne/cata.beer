var express = require('express');
var router = express.Router();
var path = require('path');
var BreweryDb = require('brewerydb-node');
var brewdb = new BreweryDb('c6a44f4ad5bb5961c187c4b6e968953c');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('api');
});

router.get('/beer', function(req, res, next) {
    brewdb.search.beers({ q: "dogfish" }, function(err, data){
        if(err){

        }
        res.send(data);
    });
});

router.get('/brewery/:brewery', function(req, res, next) {
    const breweryName = req.params['brewery'];
    brewdb.search.beers({ q: breweryName }, function(err, data){
        if(err){

        }
        res.send(data);
    });
});

module.exports = router;
