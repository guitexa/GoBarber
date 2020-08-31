"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../../users/repositories/fakes/FakeUsersRepository"));

var _FakeNotificationsRepository = _interopRequireDefault(require("../../notifications/repositories/fakes/FakeNotificationsRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

var _CreateAppointmentService = _interopRequireDefault(require("./CreateAppointmentService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeAppointmentsRepository;
let fakeNotificationsRepository;
let fakeCacheProvider;
let createAppointment;
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new _FakeAppointmentsRepository.default();
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeNotificationsRepository = new _FakeNotificationsRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    createAppointment = new _CreateAppointmentService.default(fakeAppointmentsRepository, fakeUsersRepository, fakeNotificationsRepository, fakeCacheProvider);
  });
  it('should be to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 20, 13).getTime();
    });
    const provider = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gobarber.com',
      password: '123456'
    });
    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456'
    });
    const appointment = await createAppointment.execute({
      provider_id: provider.id,
      user_id: user.id,
      date: new Date(2020, 6, 20, 14)
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe(provider.id);
  });
  it('should NOT be to create an appointment for an inexistent provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 20, 13).getTime();
    });
    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456'
    });
    await expect(createAppointment.execute({
      provider_id: 'provider-id',
      user_id: user.id,
      date: new Date(2020, 6, 20, 14)
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should NOT be to create an appointment for an inexistent user', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 20, 13).getTime();
    });
    const provider = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gobarber.com',
      password: '123456'
    });
    await expect(createAppointment.execute({
      provider_id: provider.id,
      user_id: 'user-id',
      date: new Date(2020, 6, 20, 14)
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should NOT be able to create appointments on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 19).getTime();
    });
    const provider = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gobarber.com',
      password: '123456'
    });
    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456'
    });
    await createAppointment.execute({
      provider_id: provider.id,
      user_id: user.id,
      date: new Date(2020, 6, 20, 14)
    });
    await expect(createAppointment.execute({
      provider_id: provider.id,
      user_id: user.id,
      date: new Date(2020, 6, 20, 14)
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should NOT be able to create an appointments on past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 17).getTime();
    });
    const provider = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gobarber.com',
      password: '123456'
    });
    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456'
    });
    await expect(createAppointment.execute({
      provider_id: provider.id,
      user_id: user.id,
      date: new Date(2020, 6, 16, 10)
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should NOT be able to create an appointments with same user', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 20, 13).getTime();
    });
    const provider = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gobarber.com',
      password: '123456'
    });
    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456'
    });
    await expect(createAppointment.execute({
      provider_id: user.id,
      user_id: user.id,
      date: new Date(2020, 6, 20, 14)
    })).rejects.toBeInstanceOf(_AppError.default);
    await expect(createAppointment.execute({
      provider_id: provider.id,
      user_id: provider.id,
      date: new Date(2020, 6, 20, 14)
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should NOT be able to create an appointments before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 20, 13).getTime();
    });
    const provider = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gobarber.com',
      password: '123456'
    });
    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456'
    });
    await expect(createAppointment.execute({
      provider_id: provider.id,
      user_id: user.id,
      date: new Date(2020, 6, 21, 7)
    })).rejects.toBeInstanceOf(_AppError.default);
    await expect(createAppointment.execute({
      provider_id: provider.id,
      user_id: user.id,
      date: new Date(2020, 6, 21, 18)
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});