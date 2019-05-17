const Sequelize = require('sequelize');
const mysql = require('mysql2/promise');
const moment = require('moment');
const config = require('./config.js');

mysql.createConnection({
  user: config.username,
  password: config.password
})
  .then((connection) => {
    connection.query('DROP DATABASE IF EXISTS calendarCnC;')
      .then(() => {
        // Safe to use sequelize now
        connection.query('CREATE DATABASE IF NOT EXISTS calendarCnC;')
          .then(() => {
            console.log('DATABASE CREATED SUCCESSFULLY!');
            const sequelize = new Sequelize('calendarcnc', 'root', 'password', {
              host: config.host,
              dialect: 'mysql',
              username: config.username
            });

            sequelize
              .authenticate()
              .then(() => {
                console.log('Connection has been established successfully.');
                
                const Listing = sequelize.define('listing', 
                  {
                    final_day: {
                      type: Sequelize.DATEONLY,
                      // allowNull: false
                    },
                    min_nights: {
                      type: Sequelize.INTEGER
                      // allowNull defaults to true
                    }
                  }, {
                    // options
                  }
                );

                // const Booking = sequelize.define('booking', 
                //   {
                //     listing_id: {
                //       type: Sequelize.INTEGER,
                //       // allowNull: false
                //     },
                //     checkin: {
                //       type: Sequelize.DATEONLY
                //       // allowNull defaults to true
                //     },
                //     duration: {
                //       type: Sequelize.INTEGER
                //       // allowNull defaults to true
                //     },
                //     checkout: {
                //       type: Sequelize.DATEONLY
                //       // allowNull defaults to true
                //     }
                //   }, {
                //     // options
                //   }
                // );

                Listing.sync({ force: true }).then(() => {
                  // Now the `users` table in the database corresponds to the model definition
                  return Listing.create({ final_day: moment().add(90, 'days').calendar(), min_nights: 1 }).then( rental => {
                    console.log('This rentals auto-generated ID is:', rental.id);
                    console.log('This rental has to be booked for a minimum of: ', rental.min_nights);
                    console.log('The final date this rental is available is: ', rental.final_day);
                  })
                    .then(() => {
                      sequelize.close()
                        .then(() => {
                          connection.end();
                          console.log('DB Connection closed!');
                        });
                    });

                });

                
                
            
                
              })
              .catch(err => {
                console.error('Unable to connect to the database:', err);
              });
        
          });
        
        
        
        
        
        
        
        
        

      });
  });




