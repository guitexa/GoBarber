"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IUsersRepository = _interopRequireDefault(require("../../users/repositories/IUsersRepository"));

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _classTransformer = require("class-transformer");

var _IAppointmentsRepository = _interopRequireDefault(require("../repositories/IAppointmentsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListProviderAppointmentsService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('AppointmentsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IAppointmentsRepository.default === "undefined" ? Object : _IAppointmentsRepository.default, typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class ListProviderAppointmentsService {
  constructor(appointmentsRepository, usersRepository, cacheProvider) {
    this.appointmentsRepository = appointmentsRepository;
    this.usersRepository = usersRepository;
    this.cacheProvider = cacheProvider;
  }

  async execute({
    provider_id,
    day,
    month,
    year
  }) {
    const keyCache = `provider-appointments-list:${provider_id}:${year}-${month}-${day}`;
    const checkProviderExists = await this.usersRepository.findByID(provider_id);

    if (!checkProviderExists) {
      throw new _AppError.default('This provider_id not exists');
    }

    let appointments = await this.cacheProvider.recover(keyCache);

    if (!appointments) {
      appointments = await this.appointmentsRepository.findAllInDayFromProvider({
        provider_id,
        day,
        month,
        year
      });
      await this.cacheProvider.save(keyCache, (0, _classTransformer.classToClass)(appointments));
    }

    return appointments;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = ListProviderAppointmentsService;