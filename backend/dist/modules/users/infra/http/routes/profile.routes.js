"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuth = _interopRequireDefault(require("../middlewares/ensureAuth"));

var _UserProfileController = _interopRequireDefault(require("../controllers/UserProfileController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const profileRouter = (0, _express.Router)();
const userProfile = new _UserProfileController.default();
profileRouter.use(_ensureAuth.default);
profileRouter.get('/', userProfile.show);
profileRouter.put('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string(),
    email: _celebrate.Joi.string().email(),
    old_password: _celebrate.Joi.string(),
    // Required if password is filled
    password: _celebrate.Joi.string().min(6),
    // Required if old_password is filled
    password_confirmation: _celebrate.Joi.string().valid(_celebrate.Joi.ref('password')) // Required if password is filled

  }
}), userProfile.update);
var _default = profileRouter;
exports.default = _default;