import { uuid } from 'uuidv4';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '../../infra/typeorm/entities/User';

export default class FakeUsersRepository implements IUsersRepository {
  private usersRepository: User[] = [];

  public async findByID(id: string): Promise<User | undefined> {
    const findUser = this.usersRepository.find(user => user.id === id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.usersRepository.find(user => user.email === email);

    return findUser;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, userData);

    this.usersRepository.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const getIndex = this.usersRepository.findIndex(
      getUser => getUser.id === user.id,
    );

    this.usersRepository[getIndex];

    return user;
  }
}
