const express = require('express');
const server = express();
const proxy = require('http-proxy-middleware');

server.set('view engine', 'hbs');

const createProxy = (path, target) =>
  server.use(path, proxy({ target, changeOrigin: true, pathRewrite: {[`^${path}`]: ''} }));

createProxy('/header', 'http://localhost:3001');
createProxy('/products', 'http://localhost:3002');
createProxy('/cart', 'http://localhost:3003');

server.get('/', (req, res) => res.render('index'));

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Homepage listening on port ${port}`);
});