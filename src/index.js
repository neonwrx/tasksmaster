import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import history from './history';
import { firebaseApp, userListRef } from './firebase';
import { logUser } from './actions';
import reducer from './reducers';

import App from './components/App';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

import './styles/App.css';

const store = createStore(reducer);

firebaseApp.auth().onAuthStateChanged(user => {
  if (user) {
    // console.log('user has signed in or up', user);
    const { email } = user;
    const logEmail = email;

    userListRef.on('value', snap => {
      let currentUser = {};
      snap.forEach(usr => {
        const { email, name } = usr.val();
        const serverKey = usr.key;
        if (email === logEmail) {
          // console.log('test', logEmail);
          currentUser.email = email;
          currentUser.name = name;
          currentUser.serverKey = serverKey;
        }
      });
      store.dispatch(logUser(currentUser));
    });

    history.push('/app');
  } else {
    // console.log('user has signed out or still needs to sign in.');
    history.replace('/signin');
  }
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Route exact path="/app" component={App} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </div>
    </Router>
  </Provider>, document.getElementById('root')
)
