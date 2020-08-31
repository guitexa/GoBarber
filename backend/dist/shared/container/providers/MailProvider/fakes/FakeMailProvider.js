"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class FakeMailProvider {
  constructor() {
    this.messagesRepository = [];
  }

  async sendMail(message) {
    this.messagesRepository.push(message);
  }

}

exports.default = FakeMailProvider;