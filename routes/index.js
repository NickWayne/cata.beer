var express = require('express');
var router = express.Router();
var path = require('path');
var BreweryDb = require('brewerydb-node');
var brewdb = new BreweryDb('c6a44f4ad5bb5961c187c4b6e968953c');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, "../views/index.html"));
});

router.get('/api', function(req, res, next) {
    brewdb.search.beers({ q: "dogfish" }, function(err, data){
        if(err){

        }
        res.send(data);
    });
});
module.exports = router;
