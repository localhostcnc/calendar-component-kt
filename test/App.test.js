import React from 'react';
import { shallow } from 'enzyme';

import App from '../client/src/components/App';

describe('App component', () => {
  test('Rendering the simple component', () => {
    const wrapper = shallow(
      <App />
    );
    // func={() => {}}
    // value={1}

    expect(wrapper).toMatchSnapshot();
  });

  it('has listing state of null ', () => {
    const wrapper = shallow(
      <App />
    );
    const listingState = wrapper.state().listing;
    expect(listingState).toEqual(null);
  });

  it('has a bookings state of null', () => {
    const wrapper = shallow(
      <App />
    );
    const bookingsState = wrapper.state().bookings;
    expect(bookingsState).toEqual(null);
  });
});