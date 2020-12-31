import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import Country from './country';
import { createStore } from 'redux';

const initialState = {
    data :  [],
    states : [],
    state_name : ''
}

//reducer emits state according to the action
function rootReducer (state = initialState, action){
    return state;
  }

const store = createStore(rootReducer);

const wrapper = shallow(<Provider store = {store}><Country/></Provider>);

it('component renders without crashing', () => {
  expect(
    wrapper.exists()
  ).toBe(true)
});