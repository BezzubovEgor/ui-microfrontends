import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

class Header extends HTMLElement {
    attachedCallback() {
        ReactDOM.render(<App />, this.createShadowRoot());
    }
}
window.customElements.define('microfrontend-header', Header);
