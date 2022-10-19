import React from 'react';
import { render } from 'react-dom';
import App from '../client/components/App.jsx';

// uncomment so that webpack can bundle styles
import styles from '../client/styles/styles.scss';

render(
  <App />,
  document.getElementById('root')
);