"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuth = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuth"));

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _AppointmentsController = _interopRequireDefault(require("../controllers/AppointmentsController"));

var _ProviderAppointmentsController = _interopRequireDefault(require("../controllers/ProviderAppointmentsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const appointmentsRouter = (0, _express.Router)();
const appointments = new _AppointmentsController.default();
const providerAppointments = new _ProviderAppointmentsController.default();
appointmentsRouter.use(_ensureAuth.default);
appointmentsRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    provider_id: _joi.default.string().uuid().required(),
    date: _joi.default.date().required()
  }
}), appointments.create);
appointmentsRouter.get('/me', (0, _celebrate.celebrate)({
  [_celebrate.Segments.QUERY]: {
    day: _joi.default.string().required(),
    month: _joi.default.string().required(),
    year: _joi.default.string().required()
  }
}), providerAppointments.show);
var _default = appointmentsRouter;
exports.default = _default;