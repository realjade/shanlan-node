var express = require('express');
var router = express.Router();

/* main page. */
router.get('/', function (req, res) {

    res.render('main/home', {

    });
});
module.exports = router;
