"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fCurrency = fCurrency;
exports.fPercent = fPercent;
exports.fNumber = fNumber;
exports.fShortenNumber = fShortenNumber;
exports.fData = fData;
exports.separateur = separateur;

var _lodash = require("lodash");

var _numeral = _interopRequireDefault(require("numeral"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// ----------------------------------------------------------------------
function fCurrency(number) {
  return (0, _numeral["default"])(number).format(Number.isInteger(number) ? '$0,0' : '$0,0.00');
}

function fPercent(number) {
  return (0, _numeral["default"])(number / 100).format('0.0%');
}

function fNumber(number) {
  return (0, _numeral["default"])(number).format();
}

function fShortenNumber(number) {
  return (0, _lodash.replace)((0, _numeral["default"])(number).format('0.00a'), '.00', '');
}

function fData(number) {
  return (0, _numeral["default"])(number).format('0.0 b');
}

function separateur(nombre) {
  if (nombre) {
    nombre = "".concat(nombre); // nombre = nombre.toLocaleString();

    return nombre.replace(/ /g, "").replace(/[^0-9.]+/, "").toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
  }

  return "";
}

;