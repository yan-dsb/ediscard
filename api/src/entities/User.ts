import { Exclude } from 'class-transformer';
import { v4 as uuid } from 'uuid';
class User {
  id: string;

  name: string;

  email: string;

  @Exclude()
  password: string;

  created_at: Date;

  updated_at: Date;

  isAdmin: boolean;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { User };
