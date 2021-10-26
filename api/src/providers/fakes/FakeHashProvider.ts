import { IHashProvider } from '../IHashProvider';

class FakeHashProvider implements IHashProvider {
  async generate(payload: string) {
    return payload;
  }
  async compare(payload: string, hash: string) {
    return payload === hash;
  }
}

export { FakeHashProvider };
