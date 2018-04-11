/*Store the routes for the application*/

'use strict';

var express = require('express');

module.exports = function(app) {

	var path = require('path');

  	app.use('/api/verticals', require('./api/').unit);
  	app.use('/api/employees', require('./api/').employee);

};