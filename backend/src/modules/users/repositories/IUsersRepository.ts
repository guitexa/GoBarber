import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IExceptUserIDDTO from '../dtos/IExceptUserIDDTO';

export default interface IUsersRepository {
  findByID(id: string): Promise<User | undefined>;
  findAllProviders(data: IExceptUserIDDTO): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
