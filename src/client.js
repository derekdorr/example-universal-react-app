import React from 'react';
import ReactDOM from 'react-dom';
import ExamplePage from './containers/ExamplePage';

const reactRoot = window.document.getElementById('react-root');
window.global = window;

ReactDOM.render(<ExamplePage />, reactRoot);
