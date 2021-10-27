import { v4 as uuid } from 'uuid';

class RecycledMaterial {
  id: string;
  user_id: string;
  user_id_admin: string;
  weight_base: number;
  weight_amount: number;
  balance_generated: number;
  created_at: Date;
  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { RecycledMaterial };
