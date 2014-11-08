var express = require('express');
var router = express.Router();

/* search result page. */
router.get('/', function (req, res) {

    res.render('search/photo', {});
});
module.exports = router;
