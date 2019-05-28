import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

library.add(faArrowRight, faArrowLeft);

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateObject: moment(),
      leftMonth: moment(),
      rightMonth: moment().add(1, 'months'),
      leftDays: null,
      rightDays: null,
      dateSelected: null,
      bgColor: null
    };
  }

  componentDidMount() {
    this.props.getCalendarData((err, responseData) => {
      if (err) {
        console.log('Response Error: ', err);
      } else {
        var listingData = responseData.data.listing;
        var bookingData = responseData.data.bookings;

        //sort booking data by date in ascending order 
        bookingData.sort(function(a, b) {
          return new Date(a.checkin) - new Date(b.checkin);
        });

        this.setState({
          listing: listingData,
          bookings: bookingData
        });
      }
    });
  }

  onDayClick(e) {
    let dayClicked = Number(e.target.innerText);
    let formattedDate = moment(this.state.leftMonth).startOf('month').add(dayClicked - 1, 'days');
    let latestCheckoutDate;
    let checkinDay;
    let checkoutDay;
    let nightsBooked;
    
    if (!this.state.latestCheckoutDate) {
      //when checkin date is selected search through bookings to determine latest possible checkout date
      for (let i = 0; i < this.state.bookings.length; i += 1) {
        let blockedDate = this.state.bookings[i].checkin;
        if (new Date(blockedDate) > new Date(formattedDate.format('MMMM DD YYYY'))) {
          latestCheckoutDate = moment(blockedDate);
          break;
        }
      }
      this.setState({
        selectedDay: dayClicked,
        dateSelected: formattedDate,
        latestCheckoutDate: latestCheckoutDate
      });
    } else if (!(formattedDate > this.state.latestCheckoutDate)) {
      //when checkout date is selected, determine number of nights for booking
      checkoutDay = Number(formattedDate.format('D'));
      checkinDay = this.state.selectedDay;
      nightsBooked = checkoutDay - checkinDay;

      this.setState({
        currentCheckoutDate: formattedDate,
        nightsBooked: nightsBooked,
        checkoutDay: checkoutDay
      });
    }
  }


  previousMonth() {
    let left = moment(this.state.leftMonth).subtract(1, 'months');
    let right = moment(this.state.rightMonth).subtract(1, 'months');
    this.setState({
      leftMonth: left,
      rightMonth: right
    });
  }
    
  nextMonth() {
    let left = moment(this.state.leftMonth).add(1, 'months');
    let right = moment(this.state.rightMonth).add(1, 'months');
    this.setState({
      leftMonth: left,
      rightMonth: right
    });
  }

  firstDayOfMonth(leftOrRight) {
    //returns the first day of the month that is passed in as argument
    let firstDay = moment(leftOrRight).startOf('month').format('d');
    return firstDay;
  }

  weekDayFormatter() {
    return moment.weekdaysShort().map(day => (
      <DayOfMonth key={day}>
        {day.slice(0, -1)}
      </DayOfMonth>
    ));
  }
  

  leftMonthFormatter() {
    let leftFiller = [];
    let rowsOfDaysLeft = [];
    let daysPerEachWeekLeft = [];
    let daysInLeftMonth = [];

    if (this.state.bookings) {
      for (let i = 0; i < this.firstDayOfMonth(this.state.leftMonth); i += 1) {
        leftFiller.push(
          <CalendarDay style={{ border: 'none', background: 'white' }}></CalendarDay>
        );
      }

      for (let d = 1; d <= this.state.leftMonth.daysInMonth(); d += 1) {
        let currentDay = moment(this.state.leftMonth).startOf('month').add(d - 1, 'days').format('YYYY-MM-DD');
        let found = false;
        for (let i = 0; i < this.state.bookings.length; i += 1) {
          let booking = this.state.bookings[i].checkin;
          if ((booking === currentDay) && (found === false)) {
            found = true;
            daysInLeftMonth.push(
              <GreyCalendarDay key={d}>
                {d}
              </GreyCalendarDay>
            );
          }
        }
        if (!found) {
          daysInLeftMonth.push(
            <CalendarDay onClick={()=>{}} key={d}>
              {d}
            </CalendarDay>
          );
        }
      }

      let totalCalendarDays = [...leftFiller, ...daysInLeftMonth];
    
      totalCalendarDays.forEach((row, i) => {
        if (i % 7 !== 0) {
          daysPerEachWeekLeft.push(row);
        } else {
          rowsOfDaysLeft.push(daysPerEachWeekLeft);
          daysPerEachWeekLeft = [];
          daysPerEachWeekLeft.push(row);
        }
        if (i === totalCalendarDays.length - 1) {
          rowsOfDaysLeft.push(daysPerEachWeekLeft);
        }
      });

      return rowsOfDaysLeft.map(d => <tr onClick={e => { this.onDayClick(e); }}>{d}</tr>);
    }
  }

  rightMonthFormatter() {
    let rightFiller = [];
    let daysInRightMonth = [];
    let rowsOfDaysRight = [];
    let daysPerEachWeekRight = [];

    if (this.state.bookings) {
      for (let i = 0; i < this.firstDayOfMonth(this.state.rightMonth); i += 1) {

        rightFiller.push(
          <CalendarDay style={{ border: 'none', background: 'white' }}></CalendarDay>
        );
      }

      for (let d = 1; d <= this.state.rightMonth.daysInMonth(); d += 1) {
        let currentDay = moment(this.state.rightMonth).startOf('month').add(d - 1, 'days').format('YYYY-MM-DD');
        let found = false;
        for (let i = 0; i < this.state.bookings.length; i += 1) {
          let booking = this.state.bookings[i].checkin;
          if ((booking === currentDay) && (found === false)) {
            found = true;
            daysInRightMonth.push(
              <GreyCalendarDay key={d}>
                {d}
              </GreyCalendarDay>
            );
          }
        }
        if (!found) {
          daysInRightMonth.push(
            <CalendarDay onClick={()=>{}} key={d}>
              {d}
            </CalendarDay>
          );
        }
      }

      let totalCalendarDays = [...rightFiller, ...daysInRightMonth];
  
      totalCalendarDays.forEach((row, i) => {
        if (i % 7 !== 0) {
          daysPerEachWeekRight.push(row);
        } else {
          rowsOfDaysRight.push(daysPerEachWeekRight);
          daysPerEachWeekRight = [];
          daysPerEachWeekRight.push(row);
        }
        if (i === totalCalendarDays.length - 1) {
          rowsOfDaysRight.push(daysPerEachWeekRight);
        }
      });
      return rowsOfDaysRight.map(d => <tr onClick={e => { this.onDayClick(e); }}>{d}</tr>);
    }
  }

  render() {
    return (
      <div>
        <AvailabilityStyle>
        Availability
        </AvailabilityStyle>
        <LeftArrow onClick={() => { this.previousMonth(); }}>
          <FontAwesomeIcon icon="arrow-left" />
        </LeftArrow>
        <Wrapper>

          <CalendarTitle>
            {this.state.leftMonth.format('MMMM YYYY')}
          </CalendarTitle>
          {this.weekDayFormatter()}
          <CalendarBody>
            {this.leftMonthFormatter()}
          </CalendarBody>
        </Wrapper>
        <Wrapper2>
          <CalendarTitle>
            {this.state.rightMonth.format('MMMM YYYY')}
          </CalendarTitle>
          {this.weekDayFormatter()}
          <CalendarBody>
            {this.rightMonthFormatter()}
          </CalendarBody>
        </Wrapper2>
        <RightArrow onClick={() => { this.nextMonth(); }}>
          <FontAwesomeIcon icon="arrow-right"/>
        </RightArrow>
      </div>
    );
  }
}

// text-align: center;
const AvailabilityStyle = styled.div`
  font-size: 20px;
  padding-bottom: 50px;
  font-weight: bold;
  color: #484848;
`;
const Wrapper = styled.section`
  font-style: bold;
  font-family: 'Montserrat', sans-serif;
  width: 22%;
  float: left;
  color: #D0D0D0;
`;

const Wrapper2 = styled.section`
  font-style: bold;
  font-family: 'Montserrat', sans-serif;
  width: 22%;
  float: left;
`;

const LeftArrow = styled.button`
  border: solid;
  float: left;
  
  padding: 5px 7px 5px 7px;
  border-width: thin;
  border-radius: 2px;
  color: #D0D0D0;
`;

const RightArrow = styled.button`
  border: solid;
  position: absolute;
  float: right;
  
  padding: 5px 7px 5px 7px;
  border-width: thin;
  border-radius: 2px;
  color: #D0D0D0;
`;

const Weekday = styled.section`
  padding: 2px;
  width: 100%;
`;

const DayOfMonth = styled.section`
  padding-left: 10.5px;
  padding-right: 11px;
  font-weight: lighter;
  display: inline;
  color: #484848;
`;

const GreyCalendarDay = styled.section`
  display: table-cell;
  padding: 11px;
  text-align: center;
  border-radius: 4px;
  border-color: grey;
  background: repeating-linear-gradient(
    -45deg,
    #d6d6d6 1px,
    #d6d6d6 1px,
    #ffffff 2px,
    #ffffff 6px
  );
  color: lightgrey;
  font-weight: bolder;
`;

const CalendarDay = styled.section`
  display: table-cell;
  padding: 11px;
  text-align: center;
  border-radius: 4px;
  border-color: grey;
  background: #F2FDFA;
  color: #0C838A;
  font-weight: bolder;
  :hover {
    background: #BDECE0;
  }
`;

const CalendarTitle = styled.section`
  text-align: center;
  font-size: 20px;
  padding-bottom: 20px;
  font-weight: bolder;
  color: #484848;
`;

const CalendarBody = styled.section`
  border-spacing: 2px;
`;

export default Calendar;