export default interface HashProvider {
  generateHash(pass: string): Promise<string>;
  compareHash(pass: string, hashed: string): Promise<boolean>;
}
