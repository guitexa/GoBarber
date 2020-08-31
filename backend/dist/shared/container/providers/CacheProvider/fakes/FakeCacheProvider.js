"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class FakeCacheProvider {
  constructor() {
    this.cacheRepository = {};
  }

  async save(key, value) {
    this.cacheRepository[key] = JSON.stringify(value);
  }

  async recover(key) {
    const data = this.cacheRepository[key];

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data);
    return parsedData;
  }

  async invalidate(key) {
    delete this.cacheRepository[key];
  }

  async invalidatePrefix(prefix) {
    const keys = Object.keys(this.cacheRepository).filter(key => key.startsWith(`${prefix}:`));
    keys.forEach(key => {
      delete this.cacheRepository[key];
    });
  }

}

exports.default = FakeCacheProvider;