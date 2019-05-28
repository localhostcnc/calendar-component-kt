import React from 'react';
import axios from 'axios';
// import moment from 'moment';
import Calendar from './Calendar.jsx';

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
        // console.log('Axios GET request from client Successful', response.data);
      })
      .catch(function (error) {
        cb(error);
        console.log('Axios GET request from client NOT Successful', error);
      });
  }


  render () {
    return (
      <div>
        <Calendar getCalendarData={this.getCalendarData.bind(this)}/>
        {/* <section>
          <div>
            <h2>
            Availability
            </h2> 
          </div>
          <div style="width: 632px;">
          </div>
          <div></div>
        </section> */}
      </div> 
    );
  }
}

export default App;