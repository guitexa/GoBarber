"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class FakeHashProvider {
  async generateHash(pass) {
    return pass;
  }

  async compareHash(pass, hashed) {
    return pass === hashed;
  }

}

exports.default = FakeHashProvider;