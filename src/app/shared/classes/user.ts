export class User {
  email: string;
  id: string;
  createdAt: Number;
  updatedAt: Number;

  constructor(email: string, id?: string, createdAt?: Date, updatedAt?: Date) {
    this.email = email;
    this.id = id;
    this.createdAt = createdAt ? createdAt.getTime() : new Date().getTime();
    this.updatedAt = updatedAt ? updatedAt.getTime() : new Date().getTime();
  }
}
