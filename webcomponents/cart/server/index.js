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
    const rootElem = '<microfrontend-cart>';
    const renderedApp = renderToString(<App/>);

    res.send(html.replace(rootElem,`${rootElem}${renderedApp}`));
  });
});

server.use(express.static('build'));

const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});