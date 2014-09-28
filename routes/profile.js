var express = require('express');
var router = express.Router();

/* user profile. */
router.get(['/', '/:id'], function (req, res) {
    var ownerId = req.params.id || '2'
    
    res.render('profile/index', {
        owner:{
            userName: 'Jade',
            id: '1'
        }
    });
});

/* user about. */
router.get(['/about', '/about/:id'], function (req, res) {
    var ownerId = req.params.id || '2'

    res.render('profile/about', {
        owner:{
            userName: 'Jade',
            id: ownerId
        }
    });
});

module.exports = router;
