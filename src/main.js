import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
//import ReduxPromise from 'redux-promise';

import SearchFormMain from './components/search-form-main';
import reducers from './reducers';
import thunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(thunk/*, ReduxPromise*/)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <SearchFormMain />
    </Provider>
    , document.querySelector('#react-search-form-main'));
