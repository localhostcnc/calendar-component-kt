const supertest = require('supertest');
const should = require('should');

const server = supertest.agent('http://localhost:3333');

describe('API unit test', function() {

  //should return home page

  it('should return home page', function(done) {
    //calling home page api
    server
      .get('/')
      .expect('Content-type', /json/)
      .expect(200) // This is HTTP response
      .end(function(err, res) {
      // HTTP status should be 200
        res.status.should.equal(200);
        // Error key should be false.
        console.log('res.error: ', res.error);
        res.error.should.equal(false);
        done();
      });
  });
});