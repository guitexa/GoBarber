"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _dateFns = require("date-fns");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IUsersRepository = _interopRequireDefault(require("../../users/repositories/IUsersRepository"));

var _IAppointmentsRepository = _interopRequireDefault(require("../repositories/IAppointmentsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListProviderMonthAvailabilityService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('AppointmentsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IAppointmentsRepository.default === "undefined" ? Object : _IAppointmentsRepository.default, typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ListProviderMonthAvailabilityService {
  constructor(appointmentsRepository, usersRepository) {
    this.appointmentsRepository = appointmentsRepository;
    this.usersRepository = usersRepository;
  }

  async execute({
    provider_id,
    month,
    year
  }) {
    const checkProviderExists = await this.usersRepository.findByID(provider_id);

    if (!checkProviderExists) {
      throw new _AppError.default('This provider_id not exists');
    }

    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider({
      provider_id,
      month,
      year
    });
    const numberOfDaysInMonth = (0, _dateFns.getDaysInMonth)(new Date(year, month - 1));
    const eachDayArray = Array.from({
      length: numberOfDaysInMonth
    }, (_, index) => index + 1);
    const currentDate = new Date(Date.now());
    const availability = eachDayArray.map(day => {
      const compareDate = new Date(year, month - 1, day, 23, 59, 59);
      const appointmentsInDay = appointments.filter(appointment => {
        return (0, _dateFns.getDate)(appointment.date) === day;
      });
      return {
        day,
        available: appointmentsInDay.length < 10 && (0, _dateFns.isAfter)(compareDate, currentDate)
      };
    });
    return availability;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = ListProviderMonthAvailabilityService;