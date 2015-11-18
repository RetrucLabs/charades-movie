
var should          = require('should');
var assert          = require('assert');
var request         = require('supertest');
var server          = require('../server');

server.setExpressApp();
server.setRoutes();

describe('REST endpoints', function() {

  it('Root path should return 200 ok', function(done) {
    request(server.express).get('/').end(function(err, res) {
      if(err)  throw err;
      res.status.should.be.eql(200);
      done();
    });
  });
});
