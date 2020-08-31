"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../../users/repositories/fakes/FakeUsersRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

var _ListProviderAppointmentsService = _interopRequireDefault(require("./ListProviderAppointmentsService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeAppointmentsRepository;
let fakeCacheProvider;
let listProviderAppointments;
describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new _FakeAppointmentsRepository.default();
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    listProviderAppointments = new _ListProviderAppointmentsService.default(fakeAppointmentsRepository, fakeUsersRepository, fakeCacheProvider);
  });
  it('should be able to show all scheduled appointments from provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 19).getTime();
    });
    const provider = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gobarber.com',
      password: '123456'
    });
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: provider.id,
      user_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0)
    });
    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: provider.id,
      user_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0)
    });
    const appointments = await listProviderAppointments.execute({
      provider_id: provider.id,
      day: 20,
      month: 5,
      year: 2020
    });
    expect(appointments).toEqual([appointment1, appointment2]);
  });
  it('should NOT be able to show appointments from an inexistent provider', async () => {
    await expect(listProviderAppointments.execute({
      provider_id: 'inexistent-provider',
      day: 10,
      month: 5,
      year: 2020
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});