import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../entities/User';

interface IUsersRepository {
  create(user: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | undefined | null>;
  findByID(user_id: string): Promise<User | undefined | null>;
}

export { IUsersRepository };
