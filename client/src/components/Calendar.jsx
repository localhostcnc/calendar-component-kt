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
    let firstDay = moment(leftOrRight).startOf('month').format('d');
    return firstDay;
  }

  render() {
    const eachDayOfWeek = moment.weekdaysShort().map(day => (
      <DayOfMonth key={day}>
        {day.slice(0, -1)}
      </DayOfMonth>
    ));

    let leftFiller = [];
    for (let i = 0; i < this.firstDayOfMonth(this.state.leftMonth); i += 1) {
      leftFiller.push(
        <CalendarDay style={{ border: 'none' }}></CalendarDay>
      );
    }

    let rightFiller = [];
    for (let i = 0; i < this.firstDayOfMonth(this.state.rightMonth); i += 1) {
      rightFiller.push(
        <CalendarDay style={{ border: 'none' }}></CalendarDay>
      );
    }

    let daysInLeftMonth = [];
    for (let d = 1; d <= this.state.leftMonth.daysInMonth(); d += 1) {
      daysInLeftMonth.push(
        <CalendarDay style={{ border: 'solid', borderWidth: 'thin', borderColor: 'grey' }} key={d}>
          {d}
        </CalendarDay>
      );
    }

    let daysInRightMonth = [];
    for (let d = 1; d <= this.state.rightMonth.daysInMonth(); d += 1) {
      daysInRightMonth.push(
        <CalendarDay style={{ border: 'solid', borderWidth: 'thin', borderColor: 'grey' }} key={d}>
          {d}
        </CalendarDay>
      );
    }

    let totalLeftCalendar = [...leftFiller, ...daysInLeftMonth];
    let totalRightCalendar = [...rightFiller, ...daysInRightMonth];
    let rowsOfDaysLeft = [];
    let rowsOfDaysRight = [];
    let daysPerEachWeekLeft = [];
    let daysPerEachWeekRight = [];

    totalLeftCalendar.forEach((row, i) => {
      if (i % 7 !== 0) {
        daysPerEachWeekLeft.push(row);
      } else {
        rowsOfDaysLeft.push(daysPerEachWeekLeft);
        daysPerEachWeekLeft = [];
        daysPerEachWeekLeft.push(row);
      }
      if (i === totalLeftCalendar.length - 1) {
        rowsOfDaysLeft.push(daysPerEachWeekLeft);
      }
    });

    totalRightCalendar.forEach((row, i) => {
      if (i % 7 !== 0) {
        daysPerEachWeekRight.push(row);
      } else {
        rowsOfDaysRight.push(daysPerEachWeekRight);
        daysPerEachWeekRight = [];
        daysPerEachWeekRight.push(row);
      }
      if (i === totalRightCalendar.length - 1) {
        rowsOfDaysRight.push(daysPerEachWeekRight);
      }
    });

    let daysinLeftmonth = rowsOfDaysLeft.map(d => <tr>{d}</tr>);
    let daysinRightmonth = rowsOfDaysRight.map(d => <tr>{d}</tr>);


    return (
      <div>
        <Wrapper>
          <CalendarTitle>
            {this.state.leftMonth.format('MMMM YYYY')}
          </CalendarTitle>
          <Weekday>
            {eachDayOfWeek}
          </Weekday>
          <CalendarBody>
            {daysinLeftmonth}
          </CalendarBody>
        </Wrapper>
        <Wrapper2>
          <CalendarTitle>
            {this.state.rightMonth.format('MMMM YYYY')}
          </CalendarTitle>
          <Weekday>
            {eachDayOfWeek}
          </Weekday>
          <CalendarBody>
            {daysinRightmonth}
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
  padding: 20px 2;
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