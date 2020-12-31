import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

const wrapper = shallow(<App/>);

it('component renders without crashing', () => {
  expect(
    wrapper.exists()
  ).toBe(true)
});

it("should have Provider tag", () => {
  const provider = wrapper.find("Provider");
  expect((provider).exists()).toEqual(true);
})