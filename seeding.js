const moment = require('moment');
const faker = require('faker'); 
const Sequelize = require('sequelize');
const { sequelize, Listing, Booking } = require('./db/db.js');

const bookingSetGenerator = () => {
  //returns a new set with 60 random dates between today and 120 days from today
  let bookingSet = new Set();
  for (let i = 0; i < 59; i++) {
    //use moment to set date 120 days out
    let today = moment(new Date()).format('YYYY-MM-DD');
    let lastDay = moment(moment().add(120, 'days').calendar()).format('YYYY-MM-DD');
    let newDate = faker.date.between(today, lastDay);
    bookingSet.add(newDate);
  } 
  return bookingSet;
};

Listing.sync({ force: true }).then(() => {
  // Now the `listings` table in the database corresponds to the model definition
  for (var i = 0; i < 100; i++) {
    var lastDay = moment(moment().add(120, 'days').calendar()).format('YYYY-MM-DD');
    Listing.create({ final_day: lastDay, min_nights: 1 })
      .then( rental => {
      });
  }
});

Booking.sync({ force: true }).then(() => {
  for (var i = 1; i < 101; i++) {
    var bookingArr = bookingSetGenerator();
    bookingArr.forEach((date) => {
      Booking.create({
        listing_id: i,
        checkin: date,
        duration: 1
      })
        .then( reservation => {
          sequelize.close();
        });
    });
  }
});
