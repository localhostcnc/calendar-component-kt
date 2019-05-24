import React from 'react';
import moment from 'moment';
import styled from 'styled-components';


class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateObject: moment(),
      leftMonth: moment(),
      rightMonth: moment().add(1, 'months'),
      leftDays: null,
      rightDays: null,
      dateSelected: null
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
        }, 
        () => {
          console.log('listing STATE: ', this.state.listing);
          console.log('bookings STATE', this.state.bookings);
        }
        );
      }
    });
  }

  onDayClick(e) {
    let dayClicked = Number(e.target.innerText);
    let formattedDate = this.state.leftMonth.startOf('month').add(dayClicked - 1, 'days');
    let latestCheckoutDate;

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
    },
    () => {
      console.log('SELECTED DAY in-state: ', this.state.selectedDay);
      console.log('DATE OBJECT in-state: ', this.state.dateSelected);
      console.log('latestCheckoutDate in-state: ', this.state.latestCheckoutDate.format('MMMM DD YYYY'));
    }
    );
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

    for (let i = 0; i < this.firstDayOfMonth(this.state.leftMonth); i += 1) {
      leftFiller.push(
        <CalendarDay style={{ border: 'none' }}></CalendarDay>
      );
    }

    for (let d = 1; d <= this.state.leftMonth.daysInMonth(); d += 1) {
      daysInLeftMonth.push(
        <CalendarDay style={{ border: 'solid', borderWidth: 'thin', borderColor: 'grey' }} key={d}>
          {d}
        </CalendarDay>
      );
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

  rightMonthFormatter() {
    let rightFiller = [];
    let daysInRightMonth = [];
    let rowsOfDaysRight = [];
    let daysPerEachWeekRight = [];

    for (let i = 0; i < this.firstDayOfMonth(this.state.rightMonth); i += 1) {

      rightFiller.push(
        <CalendarDay style={{ border: 'none' }}></CalendarDay>
      );
    }

    for (let d = 1; d <= this.state.rightMonth.daysInMonth(); d += 1) {
      daysInRightMonth.push(
        <CalendarDay style={{ border: 'solid', borderWidth: 'thin', borderColor: 'grey' }} key={d}>
          {d}
        </CalendarDay>
      );
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
    return rowsOfDaysRight.map(d => <tr>{d}</tr>);
  }

  render() {
    return (
      <div>
        <Wrapper>
          <CalendarTitle>
            {this.state.leftMonth.format('MMMM YYYY')}
          </CalendarTitle>
          <Weekday>
            {this.weekDayFormatter()}
          </Weekday>
          <CalendarBody>
            {this.leftMonthFormatter()}
          </CalendarBody>
        </Wrapper>
        <Wrapper2>
          <CalendarTitle>
            {this.state.rightMonth.format('MMMM YYYY')}
          </CalendarTitle>
          <Weekday>
            {this.weekDayFormatter()}
          </Weekday>
          <CalendarBody>
            {this.rightMonthFormatter()}
          </CalendarBody>
        </Wrapper2>
      </div>
    );
  }
}

const Wrapper = styled.section`
  font-style: bold;
  width: 22%;
  margin: 0;
  border-spacing: 0;
  border-collapse: collapse;
`;

const Wrapper2 = styled.section`
  font-style: bold;
  padding-left: 300px;
  width: 22%;
  margin: 0;
  border-spacing: 0;
  border-collapse: collapse;
`;

const Weekday = styled.section`
  padding: 2px;
  width: 100%;
`;

const DayOfMonth = styled.section`
  padding-left: 10.5px;
  padding-right: 11px;
  fontStyle: bold;
  display: inline;
`;

const CalendarDay = styled.section`
  display: table-cell;
  padding: 11px 11px 11px 11px;
  text-overflow: ellipsis;
  overflow: hidden;
  width: auto;
  border-width: thin;
  text-align: center;
  margin: 0;
`;

const CalendarTitle = styled.section`
  text-align: center;
  font-size: 20px;
  padding-bottom: 20px;
  font-weight: bold;
`;

const CalendarBody = styled.section`
  color: black;
`;

export default Calendar;