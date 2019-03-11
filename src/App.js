import React, { PureComponent } from 'react';
import { Provider } from 'react-redux'
import { HashRouter as Router, Route } from 'react-router-dom'
import Header from './common/header'
import store from './store'
import Home from './pages/home';
import Detail from './pages/detail/loadable'
import Login from './pages/login'
import Write from './pages/write'

class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Header />
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/write" component={Write}></Route>
            <Route exact path="/detail/:id" component={Detail}></Route>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
