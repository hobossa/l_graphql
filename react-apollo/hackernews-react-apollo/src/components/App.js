import React, { Component } from 'react';
import LinkList from './LinkList';
import CreateLink from './CreateLink';
import Header from './Header';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './Login';
import Search from './Search';

class App extends Component {
  render() {
    return (
      <div className="center w85">
        <Header />
        <div className="ph3 pv1 background-gray">
          <Switch>
            {/* <Route exact path="/" element={<LinkList />} /> */}
            <Route
              exact
              path="/"
              render={() => <Redirect to="/new/1" />}
            />
            <Route
              exact
              path="/create"
              element={<CreateLink />}
            />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/search" element={<Search />} />
            <Route
              exact
              path="/new/:page"
              component={LinkList}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;