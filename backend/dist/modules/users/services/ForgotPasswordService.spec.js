"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeMailProvider = _interopRequireDefault(require("../../../shared/container/providers/MailProvider/fakes/FakeMailProvider"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeUserTokensRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserTokensRepository"));

var _ForgotPasswordService = _interopRequireDefault(require("./ForgotPasswordService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeMailProvider;
let fakeUsersRepository;
let fakeUserTokensRepository;
let forgotPassword;
describe('ForgotPassword', () => {
  beforeEach(() => {
    fakeMailProvider = new _FakeMailProvider.default();
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeUserTokensRepository = new _FakeUserTokensRepository.default();
    forgotPassword = new _ForgotPasswordService.default(fakeUsersRepository, fakeUserTokensRepository, fakeMailProvider);
  });
  it('should send an email when try to recovery password', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456'
    });
    await forgotPassword.execute({
      email: user.email
    });
    expect(sendMail).toBeCalled();
  });
  it('should NOT send an email when try to recovery a password for an inexistent email', async () => {
    await expect(forgotPassword.execute({
      email: 'wrong-email@mail.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should generate token when try to recovery a password', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');
    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456'
    });
    await forgotPassword.execute({
      email: user.email
    });
    expect(sendMail).toBeCalled();
    expect(generateToken).toBeCalledWith(user.id);
  });
});