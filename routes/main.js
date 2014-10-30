var express = require('express');
var router = express.Router();

/* main page. */
router.get('/', function (req, res) {

    res.render('main/home', {

    });
});

/* search result page. */
router.get('/result', function (req, res) {

    res.render('main/result', {

    });
});
module.exports = router;
