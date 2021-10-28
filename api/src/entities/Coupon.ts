import { v4 as uuid } from 'uuid';

class Coupon {
  id: string;
  balance_id: string;
  amount: number;
  isUsed: boolean;
  isCancelled: boolean;
  created_at: Date;
  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Coupon };
