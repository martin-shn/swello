import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
// import reportWebVitals from './reportWebVitals';
import { RootCmp } from './root-cmp';
import { BrowserRouter as Router } from 'react-router-dom';
import './assets/styles/main.scss';
import { Provider } from 'react-redux';
import { store } from './store/store';
// import swDev from './swDev';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootCmp />
    </Router>
  </Provider>,
  document.getElementById('root')
);

console.log('after service worker delete!');
// swDev();
// serviceWorkerRegistration.unregister();

navigator.serviceWorker.getRegistrations().then(function (registrations) {
  for (let registration of registrations) {
    registration.unregister();
  }
  serviceWorkerRegistration.register();
});

// reportWebVitals();
