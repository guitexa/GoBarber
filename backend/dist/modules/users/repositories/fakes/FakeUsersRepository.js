"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuidv = require("uuidv4");

var _User = _interopRequireDefault(require("../../infra/typeorm/entities/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeUsersRepository {
  constructor() {
    this.usersRepository = [];
  }

  async findByID(id) {
    const findUser = this.usersRepository.find(user => user.id === id);
    return findUser;
  }

  async findAllProviders({
    except_user_id
  }) {
    const users = this.usersRepository.filter(user => user.id !== except_user_id);
    return users;
  }

  async findByEmail(email) {
    const findUser = this.usersRepository.find(user => user.email === email);
    return findUser;
  }

  async create(userData) {
    const user = new _User.default();
    Object.assign(user, {
      id: (0, _uuidv.uuid)()
    }, userData);
    this.usersRepository.push(user);
    return user;
  }

  async save(user) {
    const getIndex = this.usersRepository.findIndex(getUser => getUser.id === user.id);
    this.usersRepository[getIndex];
    return user;
  }

}

exports.default = FakeUsersRepository;