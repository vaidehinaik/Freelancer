var assert = require('chai').assert;
var http = require('http');
var request = require('request');


describe('Login test', function(){
    var status = 201;
    it('Postive Testing',
        function(done){
            var req = {username:"vaidehin",password:"vaidehi"}
            request.post('http://localhost:3001/login',function(req,res) {
                assert.equal(201,res.status);
                done();
            })
        });
});

describe('Login test', function(){
    var status = 401;
    it('Negative Testing',
        function(done){
            var req = {username:"vaidehi1009@gmail.com",password:"vaidehi"}
            request.post('http://localhost:3001/login',function(req,res) {
                assert.equal(401, res.status);
                done();
            })
        });
});


describe('Signup test', function(){
    var status = 201;
    it('Positive Testing',
        function(done){
            var req = {username:"vaidehi1009@gmail.com"}
            request.get('http://localhost:3001/signup',function(req,res) {
                assert.equal(201, res.status);
                done();
            })
        });
});


describe('Signup test', function(){
    var status = 401;
    it('Negative Testing',
        function(done){
            var req = {username:"vaidehi1009@gmail.com"}
            request.get('http://localhost:3001/signup',function(req,res) {
                assert.equal(401, res.status);
                done();
            })
        });
});
