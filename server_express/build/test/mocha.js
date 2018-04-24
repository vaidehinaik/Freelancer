var chai = require('chai');
var chaiHttp = require('chai-http');
var http = require('http');
var request = require('request');
var app = require('../app');
var expect = chai.expect;
var should = require('chai').should();

chai.use(chaiHttp);

getRandomInt = max => {
  var num = Math.floor(Math.random() * Math.floor(max));
  console.log("Generated random number: " + num);
  return num;
};

describe('Signup', function () {
  var num = getRandomInt(1000);
  describe('/users/signup', function () {
    it('responds with status 201', function (done) {
      chai.request(app).post('/users/signup').send({ name: "mocha" + num, username: "mocha_user" + num, password: "mocha" }).end(function (err, res) {
        should.not.exist(err);
        res.status.should.equal(201);
        res.type.should.equal('application/json');
        done();
      });
    });
  });
});

describe('Login', function () {
  describe('/users/login', function () {
    it('responds with status 201', function (done) {
      chai.request(app).post('/users/login').send({ username: "vaidehin", password: "vaidehi" }).end(function (err, res) {
        should.not.exist(err);
        res.status.should.equal(201);
        res.type.should.equal('application/json');
        done();
      });
    });
  });
});

describe('Login Failure', function () {
  describe('/users/login', function () {
    it('responds with status 401', function (done) {
      chai.request(app).post('/users/login').send({ username: "xyz", password: "wronguser" }).end(function (err, res) {
        res.status.should.equal(401);
        res.type.should.equal('application/json');
        done();
      });
    });
  });
});

describe('User Profile', function () {
  describe('/users/userinfo', function () {
    it('responds with status 201', function (done) {
      chai.request(app).post('/users/userinfo').send({ username: "vaidehin" }).end(function (err, res) {
        if (err) {}
        should.not.exist(err);
        res.status.should.equal(201);
        res.type.should.equal('application/json');
        done();
      });
    });
  });
});

describe('User Profile', function () {
  describe('/users/userinfo', function () {
    it('responds with status 201', function (done) {
      chai.request(app).post('/users/userinfo').send({ username: "vaidehin" }).end(function (err, res) {
        should.not.exist(err);
        res.status.should.equal(201);
        res.type.should.equal('application/json');
        done();
      });
    });
  });
});

describe('All Projects ', function () {
  describe('/projects/allprojects', function () {
    it('responds with status 201', function (done) {
      chai.request(app).get('/projects/allprojects').end(function (err, res) {
        should.not.exist(err);
        res.status.should.equal(201);
        res.type.should.equal('application/json');
        done();
      });
    });
  });
});

describe('User posted projects ', function () {
  describe('/projects/userprojects', function () {
    it('responds with status 201', function (done) {
      chai.request(app).post('/projects/userprojects').send({ username: "vaidehin" }).end(function (err, res) {
        should.not.exist(err);
        res.status.should.equal(201);
        res.type.should.equal('application/json');
        done();
      });
    });
  });
});

describe('User bid projects ', function () {
  describe('/projects/userbidprojects', function () {
    it('responds with status 201', function (done) {
      chai.request(app).post('/projects/userbidprojects').send({ username: "vaidehin" }).end(function (err, res) {
        should.not.exist(err);
        res.status.should.equal(201);
        res.type.should.equal('application/json');
        done();
      });
    });
  });
});