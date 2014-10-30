var express = require('express');
var router = express.Router();

/* mobile. */
router.get('/', function (req, res) {

    res.render('mobile/home', {
        subTab: 'home'
    });
});
module.exports = router;
