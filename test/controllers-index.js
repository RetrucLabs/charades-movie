
process.env.NODE_ENV = 'test';

var should          = require('should');
//var assert          = require('assert');
var request         = require('supertest');
var server          = require('../service');
var config          = require('../config/config');

server.setExpressApp();
server.setRoutes();

describe('REST endpoints', function() {

  it('Root path should return 200 ok', function(done) {
    request(server.express).get('/').end(function(err, res) {
      should.not.exist(err);
      res.status.should.be.eql(200);
      done();
    });
  });

  it('Films list request should return default list length', function(done) {
    request(server.express).get('/films').expect('Content-Type', /json/).end(function(err, res) {
      should.not.exist(err);
      res.body.length.should.be.eql(config.filmsListDefaultLength);
      done();
    });
  });

  it('Films list request with output length param', function(done) {
    var outputLength = 2;
    request(server.express).get('/films?ol=' + outputLength).expect('Content-Type', /json/).end(function(err, res) {
      should.not.exist(err);
      res.body.length.should.be.eql(outputLength);
      done();
    });
  });
});
