import { ICreateRecycledMaterialDTO } from '../../dtos/ICreateRecycledMaterialDTO';
import { prismaClient } from '../../prisma';
import { IRecycledMaterialsRepository } from '../../repositories/IRecycledMaterialsRepository';

class RecycledMaterialsRepository implements IRecycledMaterialsRepository {
  async create({
    user_id,
    user_id_admin,
    weight_base,
    weight_amount,
    balance_generated
  }: ICreateRecycledMaterialDTO) {
    const recycledMaterial = await prismaClient.recycledMaterial.create({
      data: {
        user_id,
        user_id_admin,
        weight_base,
        weight_amount,
        balance_generated
      }
    });

    return recycledMaterial;
  }
  async listByUserID(user_id: string) {
    const recycledMaterials = await prismaClient.recycledMaterial.findMany({
      where: { user_id }
    });

    return recycledMaterials;
  }
}

export { RecycledMaterialsRepository };
