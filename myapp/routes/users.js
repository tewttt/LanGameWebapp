var express = require('express');
const { tdbParser } = require('../helper');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json( { data:tdbParser() })
});

module.exports = router;
