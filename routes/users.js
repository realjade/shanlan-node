var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
    var session = req.session;
    session.user = {
        id: 1,
        name: 'jade'
    }
    res.send('respond with a resource');
});

module.exports = router;
