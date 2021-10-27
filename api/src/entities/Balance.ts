import { v4 as uuid } from 'uuid';

class Balance {
  id: string;
  amount: number;
  user_id: string;
  created_at: Date;
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Balance };
