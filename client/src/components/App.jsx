import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: null
    };
  }

  getCalendarData () {
    axios.get('/calendar')
      .then(function (response) {
        console.log('Axios GET request from client Successful', response);
      })
      .catch(function (error) {
        console.log('Axios GET request from client NOT Successful', error);
      });
  }

  componentDidMount() {
    this.getCalendarData();
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