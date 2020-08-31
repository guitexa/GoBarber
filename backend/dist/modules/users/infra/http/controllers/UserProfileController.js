"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _ShowUserProfileService = _interopRequireDefault(require("../../../services/ShowUserProfileService"));

var _UpdateUserProfileService = _interopRequireDefault(require("../../../services/UpdateUserProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserProfileController {
  async show(req, res) {
    const showUserProfile = _tsyringe.container.resolve(_ShowUserProfileService.default);

    const user = await showUserProfile.execute({
      user_id: req.user.id
    });
    return res.json((0, _classTransformer.classToClass)(user));
  }

  async update(req, res) {
    const {
      name,
      email,
      old_password,
      password
    } = req.body;

    const updateUserProfile = _tsyringe.container.resolve(_UpdateUserProfileService.default);

    const user = await updateUserProfile.execute({
      user_id: req.user.id,
      name,
      email,
      old_password,
      password
    });
    return res.json((0, _classTransformer.classToClass)(user));
  }

}

exports.default = UserProfileController;