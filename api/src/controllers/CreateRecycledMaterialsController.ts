import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { BalancesRepository } from '../implementations/prisma/BalancesRepository';
import { RecycledMaterialsRepository } from '../implementations/prisma/RecycledMaterialsRepository';
import { UsersRepository } from '../implementations/prisma/UsersRepository';
import { CreateRecycledMaterialService } from '../services/CreateRecycledMaterialService';

class CreateRecycledMaterialsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const { user_id, weight_amount } = request.body;
    const { user_id: user_id_admin } = request;
    const usersRepository = new UsersRepository();
    const balancesRepository = new BalancesRepository();
    const recycledMaterialsRepository = new RecycledMaterialsRepository();

    const createRecycledMaterialService = new CreateRecycledMaterialService(
      usersRepository,
      balancesRepository,
      recycledMaterialsRepository
    );
    const parsedWeightAmount = Number.parseFloat(weight_amount);

    const recycledMaterial = await createRecycledMaterialService.execute({
      user_id,
      user_id_admin,
      weight_amount: parsedWeightAmount
    });

    return response.json(recycledMaterial);
  }
}

export { CreateRecycledMaterialsController };
