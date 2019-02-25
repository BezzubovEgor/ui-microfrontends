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
  console.log(`Homepage listening on port ${port}`);
});