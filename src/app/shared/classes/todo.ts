export class Todo {
  id: string;
  item: string;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
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
    this.createdAt = createdAt ? createdAt.getTime() : new Date().getTime();
    this.updatedAt = updatedAt ? updatedAt.getTime() : new Date().getTime();
  }
}
