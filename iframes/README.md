# Microfrontends based on iFrames

## Table of contents

- [Microfrontends based on iFrames](#microfrontends-based-on-iframes)
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

Also we need install `express`, some template engine for example `hbs`:

    npm install --save express hbs

Then we need to create basic view, we can create `views/index.hbs` and put next content to it:

``` html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Microfrontends</title>
  </head>
  <body>
    <iframe frameBorder="0" width="100%" height="200" src="link-to-header"></iframe>
    <iframe frameBorder="0" width="100%" height="250" src="link-to-products"></iframe>
    <iframe frameBorder="0" width="100%" height="200" src="link-to-cart"></iframe>
  </body>
</html>
```

We need to load apps `header`, `product` and `cart` using iFrames.

Create `server.js` on the root of your `root` project:

```js
const express = require('express');
const server = express();

server.set('view engine', 'hbs');

server.get('/', (req, res) => res.render('index'));

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Homepage listening on port ${port}`);
});
```

## Run apps

You need build and start all apps, you also can specify port for aps using env variables:

    cd header
    npm run build
    set PORT=3000 && npm run start:prod

You can start other apps the same way. Then you need to change urls that we passed to the `src` prop of `<iframe>`.

``` js
getContents('http://localhost:3000'),
```

Thats all!

## Architecture of app

                                   ┌──────────┐
                            ┌────> │  Header  │
                            │      └──────────┘
                            │      ┌──────────┐
            root        ────│────> │ Products │
    (iframes on template)   │      └──────────┘
                            │      ┌──────────┐
                            └────> │   Cart   │
                                   └──────────┘

Each one of those boxes is a separate app including root, deployed in a separate server (and can be running using other tools, for example docker).

## Problem

iFrames usually are not good idea, iFrame is the old technology. This technology provide full encapluslation. Thats means that you can not share stylesheets, libs and configuring of communication will be harder. But it won't break other apps and this is the easest way to implement microfrontends.