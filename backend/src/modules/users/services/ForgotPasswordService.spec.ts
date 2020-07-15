import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import ForgotPasswordService from './ForgotPasswordService';

let fakeMailProvider: FakeMailProvider;
let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let forgotPassword: ForgotPasswordService;

describe('ForgotPassword', () => {
  beforeEach(() => {
    fakeMailProvider = new FakeMailProvider();
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    forgotPassword = new ForgotPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeMailProvider,
    );
  });

  it('should send an email when try to recovery password', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456',
    });

    await forgotPassword.execute({
      email: user.email,
    });

    expect(sendMail).toBeCalled();
  });

  it('should NOT send an email when try to recovery a password for an inexistent email', async () => {
    await expect(
      forgotPassword.execute({
        email: 'wrong-email@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate token when try to recovery a password', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456',
    });

    await forgotPassword.execute({
      email: user.email,
    });

    expect(sendMail).toBeCalled();
    expect(generateToken).toBeCalledWith(user.id);
  });
});
