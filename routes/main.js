var express = require('express');
var router = express.Router();

/* main page. */
router.get('/', function (req, res) {

    res.render('main/home', {

    });
});

/* blog page. */
router.get(['/blog','/blog/:id'], function (req, res) {

    res.render('main/blog', {

    });
});
module.exports = router;
