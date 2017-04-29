import 'babel-polyfill';

import React from 'react'
import ReactDOM from 'react-dom';

import './styles/stylesheet.css';
import './styles/stylesheet.less';
import './styles/stylesheet.scss';
import './styles/stylesheet.styl';

const Box = (props) => (
  <div>
    <h1>Box</h1>
  </div>
);

ReactDOM.render(
  <Box/>,
  document.getElementById('app')
);
