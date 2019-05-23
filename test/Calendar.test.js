import React from 'react';
import { shallow } from 'enzyme';

import Calendar from '../client/src/components/Calendar';

describe('Calendar component', () => {
  test('Rendering Calendar component', () => {
    const wrapper = shallow(
      <Calendar />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('has dateSelected state of null ', () => {
    const wrapper = shallow(
      <Calendar />
    );
    const dateSelected = wrapper.state().dateSelected;
    expect(dateSelected).toEqual(null);
  });

  it('has leftDays state of null ', () => {
    const wrapper = shallow(
      <Calendar />
    );
    const leftDays = wrapper.state().leftDays;
    expect(leftDays).toEqual(null);
  });

  it('has rightDays state of null ', () => {
    const wrapper = shallow(
      <Calendar />
    );
    const rightDays = wrapper.state().rightDays;
    expect(rightDays).toEqual(null);
  });
});