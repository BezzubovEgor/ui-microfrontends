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

ReactDOM.hydrate(<App />, document.getElementById('root'));
```

Then at the root of your project create `server/server.js`. It should start express server and enable SSR for this react-app:

``` js
import React from 'react';
import { renderToString } from 'react-dom/server';

import express from 'express';
import path from 'path';
import fs from 'fs';

import { App } from '../src/App';

const server = express();

server.get('/', (req, res) => {
  const htmlPath = path.resolve(__dirname, '..', 'build', 'index.html');

  fs.readFile(htmlPath, 'utf8', (err, html) => {
    const rootElem = '<div id="root">';
    const renderedApp = renderToString(<App/>);

    res.send(html.replace(rootElem,`${rootElem}${renderedApp}`));
  });
});

server.use(express.static('build'));

const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
```

Server takes your react element (App) and renders it to a string, and then put it into the html before serving it to the end user. Then on client side React will mount on top of that already rendered component.

By default node.js does not understand JSX syntax, we need compile our app using babel or enable JSX and babel support using `@babel/register`. Before it you need install express and dev tools (babel, @babel/register, babel presets and ignore-styles to ignore `import 'App.css'` decrarations):

**Yarn:**

    yarn add express

    yarn add --dev @babel/cli @babel/core @babel/preset-env @babel/preset-react @babel/register ignore-styles

**NPM:**

    npm install --save express

    npm install --save-dev @babel/cli @babel/core @babel/preset-env @babel/preset-react @babel/register ignore-styles

To run our server with support of babel syntax and JSX we need to create `bootstrap.js` file with next content:

``` js
require('ignore-styles');

require('@babel/register')({
    ignore: [ /(node_modules)/ ],
    presets: ['@babel/preset-react', '@babel/preset-env']
});

require('./server/server');
```

Also we need to add next script to our pakcage.json:

    "start:prod": "set NODE_ENV=production&&node bootstrap.js"

Now you can build and start server using next commands:

    npm run build
    npm run start:prod

## Create other apps

You can create more apps the same way like in example below. In this example we need 3 apps: `header`, `products`, `cart`.

## Host multiple React apps on the same page

There are we have one limitation. If we use `create-react-app` to create our microfrontends this app will not work on the same page. Other React apps have side effects and prevents the bootstrapping of the first app.

The WebPack runtime adds an object to the global scope which is used to lazy-load chunks. The dafault name for this object is `webpackJsonp`. When we try to host several apps all of these apps override this global object. To solve it we should change `webpackJsonp` name to other, individual for each microfrontend.

We need to change webpack config, we can eject or use some customization mechanism, like `react-app-rewired`, in this example we will use second variant:

    npm install --save-dev react-app-rewired

Then we should add `config-overrides.js` to root of our project:

```js
module.exports = {
    webpack: (config, env) => {
        config.output.jsonpFunction = 'microfrontend-header'
        return config;
    }
};

```

Then we should to change our scripts section on the `package.json`:

``` json
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test --env=jsdom",
    "eject": "react-scripts eject",
    "start:prod": "set NODE_ENV=production&&node bootstrap.js"
}
```

Now we can host several app on the same page.

## When to use

## Put apps together

1. [Fetch on back-end](./back-end-fetch/README.md)
2. [iFrames](./iframes/README.md)
3. [Fetch with JavaScript](./js/README.md)
4. [WebComponents](./webcomponents/README.md)

## Notes

- Приложение - то что может существовать независимо от других (например Header может существовать отдельно)
- Компнент - зависит от приложения в котором отрисовывается и находится (Datepicker - не может существовать вне приложения)