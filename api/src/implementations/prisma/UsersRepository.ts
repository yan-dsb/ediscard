import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { prismaClient } from '../../prisma';
import { IUsersRepository } from '../../repositories/IUsersRepository';

class UsersRepository implements IUsersRepository {
  async create({ name, email, password }: ICreateUserDTO) {
    const user: User = await prismaClient.user.create({
      data: { name, email, password }
    });

    const userDataTransformed = new User();
    userDataTransformed.id = user.id;
    userDataTransformed.email = user.email;
    userDataTransformed.password = user.password;
    userDataTransformed.created_at = user.created_at;
    userDataTransformed.updated_at = user.updated_at;

    return userDataTransformed;
  }

  async findByEmail(email: string) {
    const user: User | null = await prismaClient.user.findUnique({
      where: { email }
    });
    let userDataTransformed;
    if (user) {
      userDataTransformed = new User();
      userDataTransformed.id = user.id;
      userDataTransformed.email = user.email;
      userDataTransformed.name = user.name;
      userDataTransformed.password = user.password;
      userDataTransformed.created_at = user.created_at;
      userDataTransformed.updated_at = user.updated_at;
    }

    return userDataTransformed;
  }
  async findByID(user_id: string) {
    const user: User | null = await prismaClient.user.findUnique({
      where: { id: user_id }
    });

    let userDataTransformed;
    if (user) {
      userDataTransformed = new User();
      userDataTransformed.id = user.id;
      userDataTransformed.email = user.email;
      userDataTransformed.password = user.password;
      userDataTransformed.isAdmin = user.isAdmin;
      userDataTransformed.created_at = user.created_at;
      userDataTransformed.updated_at = user.updated_at;
    }

    return userDataTransformed;
  }
}

export { UsersRepository };
