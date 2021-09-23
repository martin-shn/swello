import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import { carReducer } from './car.reducer.js';
import { userReducer } from './user.reducer.js';
import { systemReducer } from './system.reducer';

const rootReducer = combineReducers({
  userModule: userReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
