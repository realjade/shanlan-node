var express = require('express');
var router = express.Router();

/* user profile. */
router.get('/', function (req, res) {

    res.render('main/home', {
        subTab: 'home'
    });
});
module.exports = router;
