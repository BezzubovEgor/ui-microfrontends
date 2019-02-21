# MICROFRONTENDS

## Tools & environments

- Node & npm
- React and its environment
- NodeJS & Express.js / http-server

## Create small app

Install `create-teact-app` & `http-server`:

        npm install -g create-react-app

Create `header` app:

        create-react-app header
        cd header/
        npm start

Change your `src/App.js` to look as actual header:

```js
import React from 'react';

export const App = () => (
  <header className="App-header">
    <h1>Logo</h1>
    <nav>
      <ul>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </nav>
  </header>
);
```

Also change your `src/index.js`:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

Then at the root of your project create server.js. It should start express server and enable SSR for this react-app:

``` js
const path = require('path');
const fs = require('fs');
const express = require('express');
const React = require('react');
const App = require('./transpiled/App.js').default;
const { renderToString } = require('react-dom/server');

const server = express();

server.get('/', (req, res) => {
  const htmlPath = path.resolve(__dirname, 'build', 'index.html');

  fs.readFile(htmlPath, 'utf8', (err, html) => {
    const rootElem = '<div id="root">';
    const renderedApp = renderToString(React.createElement(App, null));

    res.send(html.replace(rootElem, rootElem + renderedApp));
  });
});

server.use(express.static('build'));

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
```

Server takes your react element (App) and renders it to a string, and then put it into the html before serving it to the end user. Then on client side React will mount on top of that already rendered component.

By default node.js does not understand JSX syntax, we need compile our app using babel. Before it you need install express and dev tools (babel and babel-presets):

**Yarn:**

    yarn add express

    yarn add --dev @babel/cli @babel/core @babel/preset-env @babel/preset-react

**NPM:**

    npm install --save express

    npm install --save-dev @babel/cli @babel/core @babel/preset-env @babel/preset-react

To run our server we need to add next scripts to our pakcage.json:

    "transpile": "NODE_ENV=production babel src --out-dir transpiled --presets es2015,react-app",
    "start:prod": "NODE_ENV=production node server.js"

Now you can build and start server using next commands:

    npm run build
    npm run transpile
    npm run start:prod

## Create other apps

You can create more apps the same way like in example below. In this example we need 3 apps: `header`, `products`, `cart`.

## When to use

## Put apps together

1. [Fetch on back-end](./back-end-fetch/README.md)
2. [iFrames]()
3. [Fetch with JavaScript]()
4. [WebComponents]()

## Notes

- Приложение - то что может существовать независимо от других (например Header может существовать отдельно)
- Компнент - зависит от приложения в котором отрисовывается и находится (Datepicker - не может существовать вне приложения)