import React from 'react';
import { shallow } from 'enzyme';

import Home from './home';

const wrapper = shallow(<Home/>);

it('component renders without crashing', () => {
  expect(
    wrapper.exists()
  ).toBe(true)
});

it('component has className card rounded', () => {
    expect(
        wrapper.find('div').at(0).hasClass('card rounded')
      ).toEqual(true)
});

it('component has className card-body', () => {
    expect(
        wrapper.find('div').at(1).hasClass('card-body')
      ).toEqual(true)
});