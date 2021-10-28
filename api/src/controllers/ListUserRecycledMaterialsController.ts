import { Request, Response } from 'express';
import { RecycledMaterialsRepository } from '../implementations/prisma/RecycledMaterialsRepository';
import { UsersRepository } from '../implementations/prisma/UsersRepository';
import { ListUserRecycledMaterialsService } from '../services/ListUserRecycledMaterialsService';

class ListUserRecycledMaterialsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request;
    const usersRepository = new UsersRepository();
    const recycledMaterialsRepository = new RecycledMaterialsRepository();
    const listUserRecycledMaterials = new ListUserRecycledMaterialsService(
      usersRepository,
      recycledMaterialsRepository
    );

    const recycledMaterials = await listUserRecycledMaterials.execute(user_id);

    return response.json(recycledMaterials);
  }
}

export { ListUserRecycledMaterialsController };
