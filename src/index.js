import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router'
import './index.css';
import * as serviceWorker from './serviceWorker';
import configureStore, {history} from './store';
import App from './components/App';
import Firebase, { FirebaseContext } from './components/Firebase';

export const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <FirebaseContext.Provider value={new Firebase()}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" component={App}/>
        </Switch>
      </ConnectedRouter>
    </FirebaseContext.Provider>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
