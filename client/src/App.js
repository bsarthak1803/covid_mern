import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Country from './country';
import State from './state';
import Home from './home';

const App = () => {
    return <div>
        <Router>
            <Switch>
                <Route path='/' exact component={Home}></Route>
                <Route path='/country' component={Country}></Route>
                <Route path='/state/:state_name/:total_cases' component={State}></Route>
            </Switch>
        </Router>
    </div>
}

export default App