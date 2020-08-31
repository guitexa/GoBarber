"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuth = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuth"));

var _ProvidersController = _interopRequireDefault(require("../controllers/ProvidersController"));

var _ProviderMonthAvailabilityController = _interopRequireDefault(require("../controllers/ProviderMonthAvailabilityController"));

var _ProviderDayAvailabilityController = _interopRequireDefault(require("../controllers/ProviderDayAvailabilityController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const providersRouter = (0, _express.Router)();
const providers = new _ProvidersController.default();
const providerMonthAvailability = new _ProviderMonthAvailabilityController.default();
const providerDayAvailability = new _ProviderDayAvailabilityController.default();
providersRouter.use(_ensureAuth.default);
providersRouter.get('/', providers.show);
providersRouter.get('/:provider_id/month-availability', (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    provider_id: _celebrate.Joi.string().uuid().required()
  },
  [_celebrate.Segments.QUERY]: {
    month: _celebrate.Joi.string().required(),
    year: _celebrate.Joi.string().required()
  }
}), providerMonthAvailability.show);
providersRouter.get('/:provider_id/day-availability', (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    provider_id: _celebrate.Joi.string().uuid().required()
  },
  [_celebrate.Segments.QUERY]: {
    day: _celebrate.Joi.string().required(),
    month: _celebrate.Joi.string().required(),
    year: _celebrate.Joi.string().required()
  }
}), providerDayAvailability.show);
var _default = providersRouter;
exports.default = _default;