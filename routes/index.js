var express = require('express');
var router = express.Router();
var path = require('path');
var BreweryDb = require('brewerydb-node');
var brewdb = new BreweryDb('c6a44f4ad5bb5961c187c4b6e968953c');

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, "../views/index.html"));
});

module.exports = router;
