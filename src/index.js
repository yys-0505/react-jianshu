import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { GlobalStyle  } from './style';
import { IconFont } from './statics/iconfont/iconfont'
import App from './App';

const Home = (
  <Fragment>
    <GlobalStyle />
    <IconFont />
    <App />
  </Fragment>
);

ReactDOM.render(Home, document.getElementById('root'));
