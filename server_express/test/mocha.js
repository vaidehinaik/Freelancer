var assert = require('chai').assert;
var http = require('http');
var request = require('request');


describe('Login test', function(){
    it('Postive Testing',
        function(done){
            var req = {username:"vaidehin",password:"vaidehi"}
            request.post('http://localhost:3001/users/login',function(req,res) {
                console.log("dfghjkcdfghj"+res.statusCode);
                 assert.equal(201,res.statusCode);
                done();
            })
       });
});

describe('Login test', function(){
    it('Negative Testing',
        function(done){
            var req = {username:"vaidehi1009@gmail.com",password:"935620"}
            request.post('http://localhost:3001/users/login',function(req,res) {
                assert.equal(401, res.statusCode);
                done();
            })
        });
});
//
//
// describe('Signup test', function(){
//     it('Positive Testing',
//         function(done){
//             var req = {name:"Vaidehi", username:"vaidehin", password:"vaidehi"}
//             request.get('http://localhost:3001/users/signup',function(req,res) {
//                 assert.equal(200, res.statusCode);
//                 done();
//             })
//         });
// });
//
//
// describe('Signup test', function(){
//     it('Negative Testing',
//         function(done){
//             var req = {name:"vaidehi1", username:"vaidehi1009@gmail.com", password: "935620"}
//             request.get('http://localhost:3001/users/signup',function(req,res) {
//                 assert.equal(401, res.statusCode);
//                 done();
//             })
//         });
// });
