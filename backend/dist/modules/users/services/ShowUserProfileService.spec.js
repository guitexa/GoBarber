"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _ShowUserProfileService = _interopRequireDefault(require("./ShowUserProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let showUserProfile;
describe('ShowUserProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    showUserProfile = new _ShowUserProfileService.default(fakeUsersRepository);
  });
  it('should be able to show user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456'
    });
    await showUserProfile.execute({
      user_id: user.id
    });
    expect(user.name).toBe('Jane Doe');
    expect(user.email).toBe('janedoe@mail.com');
  });
  it('should NOT be able to show user profile from an inexistent user', async () => {
    await expect(showUserProfile.execute({
      user_id: 'inexistent-user-id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});