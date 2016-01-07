#!/bin/env node

var express         = require('express');
var bodyParser      = require('body-parser');
var cookieParser    = require('cookie-parser');
var methodOverride  = require('method-override');
var morgan          = require('morgan');
var logger          = require('./lib/logger');
var config          = require('./config/config');

var server = module.exports = this;

server.setupNetworkConfig = function() {
  server.port = config.server.port;
  server.ip = config.server.ip;
};

server.setExpressApp = function(){
  server.express = express();
  server.express.use(bodyParser.json());       // get information from html forms
  server.express.use(methodOverride());        // simulate DELETE and PUT
  server.express.use(cookieParser());          // read cookies (needed for auth)
  server.express.use(morgan('tiny', { 'stream': logger.stream }));
};

server.setRoutes = function(){
  require('./controllers/index.js')(server.express);
};

server.terminatorHandler = function(signal){
  if (typeof signal === 'string') {
    console.log('%s: Received %s - terminating app ...', Date(Date.now()), signal);
    process.exit(1);
  }
  console.log('%s: Node server stopped.', Date(Date.now()) );
};

//  Process on exit and signals.
server.setupTerminationHandlers = function(){
  process.on('exit', server.terminatorHandler);
  var termSignals = ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT', 'SIGBUS', 'SIGFPE', 'SIGUSR1',
  'SIGSEGV', 'SIGUSR2', 'SIGTERM'];
  termSignals.forEach(function(element) {
    process.on(element, function() { server.terminatorHandler(element); });
  });
};

server.setup = function() {
  server.setupNetworkConfig();
  server.setExpressApp();
  server.setRoutes();
  server.setupTerminationHandlers();
};

server.start = function() {
  server.express.listen(server.port, server.ipaddress, function() {
    console.log('%s: Node server started on %s:%d ...', Date(Date.now()), server.ip, server.port);
  });
};

server.setup();
server.start();
