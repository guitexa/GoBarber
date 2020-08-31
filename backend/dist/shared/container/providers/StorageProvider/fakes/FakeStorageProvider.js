"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class FakeStorageProvider {
  constructor() {
    this.storage = [];
  }

  async saveFile(file) {
    this.storage.push(file);
    return file;
  }

  async deleteFile(file) {
    const getIndex = this.storage.findIndex(item => item === file);
    this.storage.splice(getIndex, 1);
  }

}

exports.default = FakeStorageProvider;