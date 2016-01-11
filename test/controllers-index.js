
process.env.NODE_ENV = 'test';

var should          = require('should');
//var assert          = require('assert');
var request         = require('supertest');
var server          = require('../service');
var config          = require('../config/config');

server.setExpressApp();
server.setRoutes();

describe('Default REST endpoints', function() {
  it('Root path should return 200 ok', function(done) {
    request(server.express).get('/').end(function(err, res) {
      should.not.exist(err);
      res.status.should.be.eql(200);
      done();
    });
  });
});

describe('Films list REST endpoints', function() {

  it('No params, returns same length', function(done) {
    request(server.express).get('/films').expect('Content-Type', /json/).end(function(err, res) {
      should.not.exist(err);
      res.body.length.should.be.eql(config.filmsListDefaultLength);
      done();
    });
  });

  it('Output length param, returns same length as param', function(done) {
    var outputLength = 2;
    request(server.express).get('/films?ol=' + outputLength).expect('Content-Type', /json/).end(function(err, res) {
      should.not.exist(err);
      res.body.length.should.be.eql(outputLength);
      done();
    });
  });

  it('Lang param, returns default length', function(done) {
    request(server.express).get('/films?lang=es').expect('Content-Type', /json/).end(function(err, res) {
      should.not.exist(err);
      res.body.length.should.be.eql(config.filmsListDefaultLength);
      done();
    });
  });

  it('Lang and output length params, returns same length as param', function(done) {
    var outputLength = 2;
    request(server.express).get('/films?ol=' + outputLength + '&lang=en').expect('Content-Type', /json/).end(function(err, res) {
      should.not.exist(err);
      res.body.length.should.be.eql(outputLength);
      done();
    });
  });

  it('Invalid lang param, returns 400', function(done) {
    request(server.express).get('/films?lang=noexists').expect('Content-Type', 'text/html; charset=utf-8').end(function(err, res) {
      should.not.exist(err);
      res.status.should.be.eql(400);
      done();
    });
  });

  it('Invalid output length param (text), returns 400', function(done) {
    request(server.express).get('/films?ol=randomtext').expect('Content-Type', 'text/html; charset=utf-8').end(function(err, res) {
      should.not.exist(err);
      res.status.should.be.eql(400);
      done();
    });
  });

  it('Invalid output length param (huge number), returns 400', function(done) {
    request(server.express).get('/films?ol=10000000').expect('Content-Type', 'text/html; charset=utf-8').end(function(err, res) {
      should.not.exist(err);
      res.status.should.be.eql(400);
      done();
    });
  });
});
