import { ICreateRecycledMaterialDTO } from '../../dtos/ICreateRecycledMaterialDTO';
import { RecycledMaterial } from '../../entities/RecycledMaterial';
import { IRecycledMaterialsRepository } from '../IRecycledMaterialsRepository';

class FakeRecycledMaterialsRepository implements IRecycledMaterialsRepository {
  private recycledMaterials: RecycledMaterial[] = [];
  async create({
    user_id,
    user_id_admin,
    weight_base,
    weight_amount,
    balance_generated
  }: ICreateRecycledMaterialDTO) {
    const recycledMaterial = new RecycledMaterial();
    Object.assign(recycledMaterial, {
      user_id,
      user_id_admin,
      weight_base,
      weight_amount,
      balance_generated
    });
    this.recycledMaterials.push(recycledMaterial);

    return recycledMaterial;
  }

  async listByUserID(user_id: string) {
    const recycledMaterials = this.recycledMaterials.filter(
      recycledMaterial => recycledMaterial.user_id === user_id
    );

    return recycledMaterials;
  }
}

export { FakeRecycledMaterialsRepository };
