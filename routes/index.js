var express = require('express');
var router = express.Router();
var path = require('path');
var bcrypt = require('bcryptjs');
var request = require('request');
var session = require('express-session');
var BreweryDb = require('brewerydb-node');
var brewdb = new BreweryDb('c6a44f4ad5bb5961c187c4b6e968953c');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/beer";

// middleware to use for all requests
// router.use(function(req, res, next) {
//     // do logging
//     console.log('Something is happening.');
//     next(); // make sure we go to the next routes and don't stop here
// });

/* GET home page. */
router.get('/', function(req, res, next) {
    request('http://www.cata.beer/api/beer', function (error, response, body) {
        if(req.session.login == true){
            res.render("index.html", { username: req.body.username, beers: JSON.parse(body)});
        }else{
            res.render("index.html", { username: "Login", beers: JSON.parse(body)});
        }
    });


    // res.sendFile(path.join(__dirname, "../views/index2.html"));
});

router.get('/login', function(req, res, next) {
    res.sendFile(path.join(__dirname, "../views/login.html"));
});

router.post('/login', function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("beer");
        dbo.collection("users").findOne({"username": req.body.username}, function(err, monres) {
            if (err) throw err;
            bcrypt.compare(req.body.password, monres.password, function(err, bcrres) {
                if(bcrres == true){
                    console.log("logged in");
                    req.session.username = req.body.username;
                    req.session.login = true;
                    res.redirect("/");
                }else{
                    console.log("errors out")
                    res.redirect("login");
                }
            });
        });
        db.close();
    });
});

router.get('/register', function(req, res, next) {
    res.sendFile(path.join(__dirname, "../views/register.html"));
});

router.post('/register', function(req, res, next) {
    if (req.body.password == req.body.password2) {
        bcrypt.hash(req.body.password, 17, function(err, hash) {
            var userObj = {
                username: req.body.username,
                password: hash
            }
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("beer");
                dbo.collection("users").insertOne(userObj, function(err, res) {
                    if (err) throw err;
                    console.log("1 document inserted");
                    req.session.username = req.body.username;
                    req.session.login = true;
                });
                db.close();
            });
        });
    }else{
        res.redirect("register");
    }
    res.redirect("/");
});

router.get('/logout', function(req, res, next) {
    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.session.username) {
        return next();
    }

    // if they aren't redirect them to the home page
    res.redirect('/login');
}

module.exports = router;
