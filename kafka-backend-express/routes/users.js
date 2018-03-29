var express = require('express');
var router = express.Router();
const passport = require("passport");
require('./passport')(passport);
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function (req, res) {
    console.log("request body: " + JSON.stringify(req.body));
    passport.authenticate('login', function (err, response) {
        console.log("my response: " + JSON.stringify(response));
        if (err) {
            console.log(err);
            res.status(400).send();
        }
        if (response.status === 200) {
            res.status(response.status).send(req.session.username);
        }
        else if (response.status === 400) {
            res.status(response.status).send({"message": response.message});
        }
        else {
            res.status(401).send({"message": "Login Failed"});
        }
    })(req, res);
});

module.exports = router;
