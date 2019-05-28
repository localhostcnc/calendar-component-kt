const Sequelize = require('sequelize');
const config = require('./config.js');


const sequelize = new Sequelize('calendarcnc', config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
  username: config.username
});

const Listing = sequelize.define('listing', 
  {
    final_day: {
      type: Sequelize.DATEONLY,
    },
    min_nights: {
      type: Sequelize.INTEGER
    }
  }
);

const Booking = sequelize.define('booking', 
  {
    listing_id: {
      type: Sequelize.INTEGER,
    },
    checkin: {
      type: Sequelize.DATEONLY
    },
    duration: {
      type: Sequelize.INTEGER
    },
    checkout: {
      type: Sequelize.DATEONLY
    }
  }
);

exports.sequelize = sequelize;
exports.Listing = Listing;
exports.Booking = Booking;