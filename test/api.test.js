// const supertest = require('supertest');
// const should = require('should');

// const server = supertest.agent('http://localhost:3333');

// describe('SAMPLE unit test', function() {

//   //should return home page

//   it('should return home page', function(done) {
//     //calling home page api
//     server
//       .get('/')
//       .expect('Content-type', /json/)
//       .expect(200) // THis is HTTP response
//       .end(function(err, res) {
//       // HTTP status should be 200
//         res.status.should.equal(200);
//         // Error key should be false.
//         console.log('res.error: ', res.error);
//         res.error.should.equal(false);
//         done();
//       });
//   });
// });

// // describe('GET /calendar/1', function () {
// //   it('respond with json containing a list of all bookings', function (done) {
// //     server
// //       .get('calendar/1')
// //       .set('Accept', 'application/json')
// //       .expect('Content-Type', /json/)
// //       .expect(200)
// //       .end(function(err, res) {
// //         console.log('RES: ', res);
// //         res.status.should.equal(200);
// //         res.error.should.equal(false);
// //         done();
// //       });
// //   });
// // });