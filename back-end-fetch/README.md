# Fetch microfrontends using backend

## Table of contents

- [Fetch microfrontends using backend](#fetch-microfrontends-using-backend)
  - [Table of contents](#table-of-contents)
  - [Create root project](#create-root-project)
  - [Run apps](#run-apps)
  - [Architecture of app](#architecture-of-app)
  - [Problem](#problem)

## Create root project

From the begining we need to create new `root` project:

    mkdir root
    cd root
    npm init

Also we need install `express`, some template engine for example `hbs` and `request` lib to fetch our apps from different locations:

    npm install --save express hbs request

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

We need to say express provide `header`, `product` and `cart` variables to this template. We need to fetch them from othes servers.

Create `server.js` on the root of your `root` project:

```js
const express = require('express');
const server = express();
const request = require('request');

server.set('view engine', 'hbs');

server.get('/', (req, res) =>
    Promise.all([
        getContents('http://path-to-your-hedaer-app'),
        getContents('http://path-to-your-products-app'),
        getContents('http://path-to-your-cart-app/')
    ]).then(responses => res.render('index', {
        header: responses[0],
        products: responses[1],
        cart: responses[2]
    })).catch(error =>
        res.send(error.message)
    )
);

const getContents = (url) => new Promise((resolve, reject) => {
    request.get(url, (error, response, body) => {
        if (error) return resolve("Error loading " + url + ": " + error.message);

        return resolve(body);
    });
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`Homepage listening on port ${port}`);
});
```

## Run apps

You need build and start all apps, you also can specify port for aps using env variables:

    cd header
    npm run build
    npm run babel
    set PORT=3000 && npm run start:prod

Also you can start other apps the same way. Then you need to change urls that we passed to the `getContents` function.

``` js
getContents('http://localhost:3000'),
```

Thats all!

## Architecture of app

                    ┌──────────┐
             ┌────> │  Header  │
             │      └──────────┘
             │      ┌──────────┐
    root ────│────> │ Products │
             │      └──────────┘
             │      ┌──────────┐
             └────> │   Cart   │
                    └──────────┘

Each one of those boxes is a separate app including root, deployed in a separate server (and can be running using other tools, for example docker).

## Problem

In some cases loading of some apps can take much time. Some apps can loads faster and some slower. In this implementation we should wait all apps to be loaded an only then send responce to end user.

Also we should load all apps, but in some cases we want implement lazy loading and using this aproach we can't do that.