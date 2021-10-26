import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];
  async create({ name, email, password }: ICreateUserDTO) {
    const user = new User();
    Object.assign(user, { name, email, password });
    this.users.push(user);

    return user;
  }

  async findByEmail(email: string) {
    const user = this.users.find(user => user.email === email);

    return user;
  }

  async findByID(user_id: string) {
    const user = this.users.find(user => user.id === user_id);

    return user;
  }
}

export { FakeUsersRepository };
