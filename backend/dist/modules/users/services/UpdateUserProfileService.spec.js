"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _UpdateUserProfileService = _interopRequireDefault(require("./UpdateUserProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeHashProvider;
let updateUserProfile;
let fakeCacheProvider;
describe('UpdateUserProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    updateUserProfile = new _UpdateUserProfileService.default(fakeUsersRepository, fakeHashProvider, fakeCacheProvider);
  });
  it('should be able to update user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456'
    });
    await updateUserProfile.execute({
      user_id: user.id,
      name: 'John Doe',
      email: 'johndoe@mail.com'
    });
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('johndoe@mail.com');
  });
  it('should NOT be able to update email to another in use', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456'
    });
    const anotherUser = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'mail@mail.com',
      password: '123456'
    });
    await expect(updateUserProfile.execute({
      user_id: user.id,
      email: anotherUser.email
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able to update user password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456'
    });
    await updateUserProfile.execute({
      user_id: user.id,
      old_password: user.password,
      password: 'new-password'
    });
    expect(user.password).toBe('new-password');
    await updateUserProfile.execute({
      user_id: user.id,
      name: 'John Doe',
      email: 'johndoe@mail.com',
      old_password: 'new-password',
      password: 'another-new-password'
    });
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('johndoe@mail.com');
    expect(user.password).toBe('another-new-password');
  });
  it('should NOT be able to update password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456'
    });
    await expect(updateUserProfile.execute({
      user_id: user.id,
      password: 'new-password'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should NOT be able to update password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456'
    });
    await expect(updateUserProfile.execute({
      user_id: user.id,
      old_password: 'wrong-old-password',
      password: 'new-password'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should NOT be able to update from an inexistent user', async () => {
    await expect(updateUserProfile.execute({
      user_id: 'inexistent-user-id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});