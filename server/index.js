/* main application file*/

'use strict';

var config = require('./config');

var express = require('express');

var app = express();

app.use(express.json());       
app.use(express.urlencoded());

var server=require('http').createServer(app);
require('./routes')(app);

server.listen( process.env.port || config.config.port, config.config.host, function () {
  console.log('Server listening on %d at %s host, in %s mode\n', config.config.port, config.config.host, config.config.env );
});
