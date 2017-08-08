export class Todo {
  id: string;
  item: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: string;

  constructor(
    item: string,
    completed?: boolean,
    userId?: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date) {
    this.item = item;
    this.completed = completed ? completed : false;
    this.user = userId;
    this.id = id;
    this.createdAt = createdAt ? createdAt : new Date();
    this.updatedAt = updatedAt ? updatedAt : new Date();
  }
}
