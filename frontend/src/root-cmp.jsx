import React from 'react';
// const { Switch, Route } = ReactRouterDOM
import { Switch, Route } from 'react-router';
import routes from './routes';

export class RootCmp extends React.Component {
  render() {
    return (
      <main>
        <Switch>
          {routes.map(route => (
            <Route key={route.path} exact component={route.component} path={route.path} />
          ))}
        </Switch>
      </main>
    );
  }
}
