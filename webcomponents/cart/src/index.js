import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

class Cart extends HTMLElement {
    attachedCallback() {
        ReactDOM.render(<App />, this.createShadowRoot());
    }
}

console.log('microfrontend-cart')
window.customElements.define('microfrontend-cart', Cart);
