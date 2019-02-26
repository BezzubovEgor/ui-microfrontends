# Microfrontends based on WebComponents

## Table of contents

- [Microfrontends based on WebComponents](#microfrontends-based-on-webcomponents)
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

Create `server.js` on the root of your `root` project, we need to fetch all apps into one page:

```js
const express = require('express');
const server = express();
const request = require('request');

server.set('view engine', 'hbs');

server.get('/', (req, res) =>
  Promise.all([
    getContents('http://localhost:3001'),
    getContents('http://localhost:3002'),
    getContents('http://localhost:3003')
  ])
  .then(([ header, products, cart ]) => res.render('index', { header, products, cart }))
  .catch(error => res.send(error.message))
);

const getContents = (url) => new Promise((resolve, reject) => {
  request.get(url, (error, response, body) => {
    if (error) return resolve("Error loading " + url + ": " + error.message);
    return resolve(body);
  });
});


const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Homepage listening on port port`);
});
```

> You also can use html imports, but it will be deprceated soon.

Then we need to create basic view, we can create `views/index.hbs` and put next content to it:

``` html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <title>Microfrontends</title>
</head>

<body>
    {{{header}}}
    {{{products}}}
    {{{cart}}}
</body>

</html>
```

But if we start app we will have error that app can't load js files. To fix it we need to build our microfronts by this way, we should set `PUBLIC_URL` environment variable:

    set PUBLIC_URL=http://path-to-microfront/&&npm run build

Next step is the avoid of clashing in shared spaces. We need to change ids of blocks to render mocrofronts, you need to change your templates and `src/index.js` of each microservise:

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
            root        ────│────> │ Products │
    (back + webcomponents)  │      └──────────┘
                            │      ┌──────────┐
                            └────> │   Cart   │
                                   └──────────┘

Each one of those boxes is a separate app including root, deployed in a separate server (and can be running using other tools, for example docker).
