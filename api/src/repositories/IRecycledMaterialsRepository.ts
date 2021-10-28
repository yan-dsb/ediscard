import { ICreateRecycledMaterialDTO } from '../dtos/ICreateRecycledMaterialDTO';
import { RecycledMaterial } from '../entities/RecycledMaterial';

interface IRecycledMaterialsRepository {
  create(data: ICreateRecycledMaterialDTO): Promise<RecycledMaterial>;
  listByUserID(user_id: string): Promise<RecycledMaterial[]>;
}

export { IRecycledMaterialsRepository };
