import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listing: null,
      bookings: null
    };
  }

  getCalendarData (cb) {
    axios.get('/calendar/1')
      .then(function (response) {
        cb(null, response);        
        console.log('Axios GET request from client Successful', response.data);
      })
      .catch(function (error) {
        cb(error);
        console.log('Axios GET request from client NOT Successful', error);
      });
  }

  componentDidMount() {
    this.getCalendarData((err, responseData) => {
      if (err) {
        console.log('Response Error: ', err);
      } else {
        var listingData = responseData.data.listing;
        var bookingData = responseData.data.bookings;
        this.setState({
          listing: listingData,
          bookings: bookingData
        });
      }
    });
  }

  render () {
    return (
      <div>
        <h1>
          Rendering App Component!
        </h1>
      </div>
    );
  }
}

export default App;