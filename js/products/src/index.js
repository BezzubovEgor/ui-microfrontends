import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

console.log('product-root');
ReactDOM.hydrate(<App />, document.getElementById('product-root'));