import { ICreateRecycledMaterialDTO } from '../dtos/ICreateRecycledMaterialDTO';
import { RecycledMaterial } from '../entities/RecycledMaterial';

interface IRecycledMaterialsRepository {
  create(data: ICreateRecycledMaterialDTO): Promise<RecycledMaterial>;
}

export { IRecycledMaterialsRepository };
