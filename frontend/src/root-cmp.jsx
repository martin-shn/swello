import React from 'react';
import { connect } from 'react-redux';
// const { Switch, Route } = ReactRouterDOM
import { Switch, Route } from 'react-router';
import routes from './routes';
import { listenForUserUpdates } from './store/actions/user.actions';

class _RootCmp extends React.Component {
  componentDidMount () {
    if ('Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window) {
      Notification.requestPermission();
    }
    this.props.listenForUserUpdates();

  }
  render () {
    return (
      <main>
        <Switch>
          {routes.map(route => (
            <Route key={route.path} component={route.component} path={route.path} />
          ))}
        </Switch>
      </main>
    );
  }
}
const mapDispatchToProps = {
  listenForUserUpdates
};

export const RootCmp = connect(null, mapDispatchToProps)(_RootCmp);