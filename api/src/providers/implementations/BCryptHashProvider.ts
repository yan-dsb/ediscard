import { IHashProvider } from '../IHashProvider';
import { hash, compare } from 'bcryptjs';

class BCryptHashProvider implements IHashProvider {
  async generate(payload: string) {
    const hashed = await hash(payload, 8);

    return hashed;
  }
  async compare(payload: string, hash: string) {
    return compare(payload, hash);
  }
}
export { BCryptHashProvider };
