"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//axios.defaults.headers.common['X-CSRF-TOKEN'] ='jjgV9gJ83HoQk231IZa16xhaCfdZBn5Qunsv4YpN'
var _default = _axios["default"].create({
  baseURL: "https://api-stylux.herokuapp.com/",
  // baseURL: "http://localhost:8000/",
  withCredentials: true,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json"
  }
});

exports["default"] = _default;