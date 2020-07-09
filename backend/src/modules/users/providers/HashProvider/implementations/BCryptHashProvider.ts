import { hash, compare } from 'bcryptjs';

import IHashProvider from '../models/IHashProvider';

export default class BCryptHashProvider implements IHashProvider {
  public async generateHash(pass: string): Promise<string> {
    return hash(pass, 8);
  }

  public async compareHash(pass: string, hashed: string): Promise<boolean> {
    return compare(pass, hashed);
  }
}
