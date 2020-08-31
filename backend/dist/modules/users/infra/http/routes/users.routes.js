"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _celebrate = require("celebrate");

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

var _ensureAuth = _interopRequireDefault(require("../middlewares/ensureAuth"));

var _UsersController = _interopRequireDefault(require("../controllers/UsersController"));

var _UserAvatarController = _interopRequireDefault(require("../controllers/UserAvatarController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usersRouter = (0, _express.Router)();
const users = new _UsersController.default();
const userAvatar = new _UserAvatarController.default();
const upload = (0, _multer.default)(_upload.default);
usersRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    email: _celebrate.Joi.string().email().required(),
    password: _celebrate.Joi.string().required()
  }
}), users.create);
usersRouter.patch('/avatar', _ensureAuth.default, upload.single('avatar'), userAvatar.update);
var _default = usersRouter;
exports.default = _default;