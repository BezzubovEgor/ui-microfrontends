"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function App() {
  return _react.default.createElement("header", {
    className: "App-header"
  }, _react.default.createElement("h1", null, "Logo"), _react.default.createElement("nav", null, _react.default.createElement("ul", null, _react.default.createElement("li", null, "About"), _react.default.createElement("li", null, "Contact"))));
};

exports.App = App;