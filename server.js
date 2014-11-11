#!/usr/bin/env node
var debug = require('debug')('shanlan-node');
var app = require('./app');

app.set('port', process.env.PORT || 3000);

console.log('服务已经启动....端口：3000');

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});

