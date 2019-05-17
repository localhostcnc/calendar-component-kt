const { Listing, Booking } = require('./db.js');

const getListingBookings = (id, callback) => {
  Booking.findAll({
    attributes: ['listing_id', 'checkin', 'duration'],
    where: {
      listing_id: id
    }
  })
    .then((bookings) => {
      //bookings come back from database in an array
      Listing.findAll({
        attributes: ['id', 'final_day', 'min_nights'],
        where: {
          id: id
        } 
      })
        .then((listing) => {
          var bookingArray = [];
          console.log('LISTING: ', listing[0].dataValues);
          //Parse booking data and store in new array
          for (var i = 0; i < bookings.length; i++) {
            bookingArray.push(bookings[i].dataValues);
          }
          console.log('BOOKINGS: ', bookingArray);
          callback(null, {
            listing: listing[0].dataValues,
            bookings: bookingArray
          });
        })
        .catch((err) => {
          callback(err);
        });
    });
};

exports.getListingBookings = getListingBookings;