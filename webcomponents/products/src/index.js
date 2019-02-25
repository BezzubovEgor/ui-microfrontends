import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

class Products extends HTMLElement {
    attachedCallback() {
        ReactDOM.hydrate(<App />, this.createShadowRoot());
    }
}
console.log('microfrontend-header');
window.customElements.define('microfrontend-products', Products);