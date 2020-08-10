import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface Request {
  user_id: string;
  name?: string;
  email?: string;
  old_password?: string;
  password?: string;
}

@injectable()
export default class UpdateUserProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    old_password,
    password,
  }: Request): Promise<User> {
    const user = await this.usersRepository.findByID(user_id);

    if (!user) {
      throw new AppError(
        'Only authenticated user can update their profiles',
        401,
      );
    }

    if (name) {
      user.name = name;

      await this.cacheProvider.invalidatePrefix('list-providers');
    }

    if (email) {
      const findEmail = await this.usersRepository.findByEmail(email);

      if (findEmail && email !== user.email) {
        throw new AppError('This email provided is already in use');
      }

      user.email = email;

      await this.cacheProvider.invalidatePrefix('list-providers');
    }

    if (password && !old_password) {
      throw new AppError('Old password must be provided to set a new one');
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('A correct old password must be provided');
      }

      user.password = await this.hashProvider.generateHash(password);

      await this.cacheProvider.invalidatePrefix('list-providers');
    }

    return this.usersRepository.save(user);
  }
}
