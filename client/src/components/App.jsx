import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Calendar from './Calendar.jsx';

const CalendarWrap = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
  font-family: Montserrat, sans-serif;
`;

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
        <CalendarWrap>
          <Calendar getCalendarData={this.getCalendarData.bind(this)}/>
        </CalendarWrap>
      </div> 
    );
  }
}

export default App;