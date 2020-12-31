import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Country from './country';
import State from './state';
import Home from './home';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const App = () => {
    const [data, setData] = useState([]);
    const [states, setStates] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect (() => {
        //fetch data from API and keep in store
        const fetchData = async () => {
            setLoading(true);
            const response = await fetch("http://localhost:5000/");
            const result = await response.json();
            setLoading(false);
            setData(result.raw_data);
            var states_array = [...new Set(result.raw_data.map ((row) =>  { return (row.detectedstate); } ) )];
            setStates(states_array);
        }
        fetchData();
    },[])

    const initialState = {
        data :  data,
        states : states,
        state_name : ''
    }

    //reducer emits state according to the action
    function rootReducer (state = initialState, action){
        return state;
      }

    //create a store
    const store = createStore(rootReducer);

    return <div>
        <Provider store={store}>
        <Router>
            <Switch>
                <Route path='/' exact component={Home}></Route>
                <Route path='/country' component={Country}></Route>
                <Route path='/state/:state_name/:total_cases' component={State}></Route>
            </Switch>
        </Router>
        </Provider>
    </div>
}

export default App