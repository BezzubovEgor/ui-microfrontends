"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function App() {
  return _react.default.createElement("sidebar", null, _react.default.createElement("h2", null, "Cart"), _react.default.createElement("p", null, "Your cart is empty"));
};

exports.App = App;