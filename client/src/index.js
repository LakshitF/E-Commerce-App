import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// Read about service workers https://bit.ly/CRA-PWA
serviceWorker.unregister();
