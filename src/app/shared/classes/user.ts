export class User {
  constructor(email: string, id?: string, createdAt?: Date, updatedAt?: Date) {
    this.email = email;
    this.id = id;
    if (createdAt) this.createdAt = createdAt;
    if (updatedAt) this.updatedAt = updatedAt;
  }

  email: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
