"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = require("bcryptjs");

class BCryptHashProvider {
  async generateHash(pass) {
    return (0, _bcryptjs.hash)(pass, 8);
  }

  async compareHash(pass, hashed) {
    return (0, _bcryptjs.compare)(pass, hashed);
  }

}

exports.default = BCryptHashProvider;