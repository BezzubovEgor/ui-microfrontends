import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

class Products extends HTMLElement {
    attachedCallback() {
        ReactDOM.hydrate(<App />, this.createShadowRoot());
    }
}

window.customElements.define('microfrontend-products', Products);