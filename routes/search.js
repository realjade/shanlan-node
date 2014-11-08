var express = require('express');
var router = express.Router();

/* search result page. */
router.get(['/', '/photographer'], function (req, res) {

    res.render('search/photographer', {});
});
module.exports = router;
