import IHashProvider from '../models/IHashProvider';

export default class FakeHashProvider implements IHashProvider {
  public async generateHash(pass: string): Promise<string> {
    return pass;
  }

  public async compareHash(pass: string, hashed: string): Promise<boolean> {
    return pass === hashed;
  }
}
