# Microfrontends based on client-side JS

## Table of contents

- [Microfrontends based on client-side JS](#microfrontends-based-on-client-side-js)
  - [Table of contents](#table-of-contents)
  - [Create root project](#create-root-project)
  - [Run apps](#run-apps)
  - [Architecture of app](#architecture-of-app)

## Create root project

From the begining we need to create new `root` project:

    mkdir root
    cd root
    npm init

Also we need install `express`, some template engine for example `hbs`:

    npm install --save express hbs

Create `server.js` on the root of your `root` project:

```js
const express = require('express');
const server = express();

server.set('view engine', 'hbs');

server.get('/', (req, res) => res.render('index');
const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`Homepage listening on port port`);
});
```

Then we need to create basic view, we can create `views/index.hbs` and put next content to it:

``` html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <title>Microfrontends</title>

  <div data-microfront="path-to-header"></div>
  <div data-microfront="path-to-products"></div>
  <div data-microfront="path-to-cart"></div>
</head>

<body>
  <script>
    function loadMicrofront(element) {
      fetch(element.dataset.microfront)
        .then(function(res) { return res.text(); })
        .then(function(text) {
          element.innerHTML = text;
          [].forEach.call(element.querySelectorAll('script'), function (nonExecutableScript) {
            var script = document.createElement("script");
            script.setAttribute("src", nonExecutableScript.src);
            script.setAttribute("type", "text/javascript");
            element.appendChild(script);
            nonExecutableScript.parentNode.removeChild(nonExecutableScript);
          });
        })
        .catch(function(err) { console.error(err); })
    }
    document.querySelectorAll('[data-microfront]').forEach(loadMicrofront);
  </script>
</body>

</html>
```

We create function to load out microfrontends with ajax, it loads all html and clone script of these htmls to start them. But after it it will not works. We will have CORS error. It is because we can not make ajax requests to other domains.

For fix it we can install `http-proxy-middleware` to `root` project.

    npm install --save http-proxy-middleware

and change `server.js`:

``` js
const express = require('express');
const server = express();
const proxy = require('http-proxy-middleware');

server.set('view engine', 'hbs');

const createProxy = (path, target) =>
  server.use(path, proxy({ target, changeOrigin: true, pathRewrite: {[`^${path}`]: ''} }));

createProxy('/header', 'path-to-header');
createProxy('/products', 'path-to-products');
createProxy('/cart', 'path-to-cart');

server.get('/', (req, res) => res.render('index'));

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Homepage listening on port ${port}`);
});
```

After that you can change links in template:

```html
...
<div data-microfront="/header"></div>
<div data-microfront="/products"></div>
<div data-microfront="/cart"></div>
...
```

But if we start app again we will have error that app can't load js files. To fix it we need to build our microfronts by this way, we should set `PUBLIC_URL` environment variable:

    set PUBLIC_URL=http://path-to-microfront/&&npm run build

Next step is the awoid of clashing in shared spaces. We need to change ids of blocks to render mocrofronts, you need to change your templates and `src/index.js` of each microservise:

```html
<div id="header-root">
```

```js
ReactDOM.render(<App />, document.getElementById('header-root'));
```

## Run apps

Now you need build and start all apps, you also can specify port for aps using env variables:

    cd header
    set PUBLIC_URL=http://path-to-microfront:3000&&npm run build
    set PORT=3000 && npm run start:prod

Thats all!

## Architecture of app

                           ┌──────────┐
                    ┌────> │  Header  │
                    │      └──────────┘
                    │      ┌──────────┐
    root (js)   ────│────> │ Products │
                    │      └──────────┘
                    │      ┌──────────┐
                    └────> │   Cart   │
                           └──────────┘

Each one of those boxes is a separate app including root, deployed in a separate server (and can be running using other tools, for example docker).