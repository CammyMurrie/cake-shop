import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import promise from 'redux-promise';

import reducers from './reducers';
import SingleCake from './components/single_cake';
import NewCake from './components/new_cake';
import CakesIndex from './components/cakes_index';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

class Hello extends React.Component {
    render() {
        return (
            <div>Hello</div>
        );
    }
}

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
        <div>
            <Switch>
                <Route path='/cakes/new' component={NewCake} />
                <Route path='/cakes/:id' component={SingleCake} />
                <Route path='/' component={CakesIndex} />
            </Switch>
        </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
