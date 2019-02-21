"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Product = function Product(product) {
  return _react.default.createElement("li", {
    style: {
      padding: "30px",
      listStyle: "none",
      border: "1px solid #CCC",
      margin: "5px"
    }
  }, _react.default.createElement("div", null, _react.default.createElement("b", null, product)), _react.default.createElement("div", null, "$ ", (Math.random() * 100).toFixed(2)), _react.default.createElement("button", null, "Buy"));
};

var App = function App() {
  return _react.default.createElement("section", null, _react.default.createElement("h2", null, "Products"), _react.default.createElement("ul", {
    style: {
      display: 'flex',
      padding: 0
    }
  }, ['Coca-Cola', 'Lays', 'Bread', 'Pizza'].map(Product)));
};

exports.App = App;