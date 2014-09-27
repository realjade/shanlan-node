var express = require('express');
var router = express.Router();

/* user profile. */
router.get('/', function (req, res) {
    res.render('profile/index', {
        owner:{
            userName: 'Jade',
            id: '1'
        }
    });
});

module.exports = router;
