export class Todo {
  id: string;
  item: string;
  completed: boolean;
  createdAt: Number;
  updatedAt: Number;
  user: string;

  constructor(
    item: string,
    id?: string,
    completed?: boolean,
    createdAt?: Date,
    updatedAt?: Date) {
    this.id = id;
    this.item = item;
    this.completed = completed ? completed : false;
    this.createdAt = createdAt ? createdAt.getTime() : new Date().getTime();
    this.updatedAt = updatedAt ? updatedAt.getTime() : new Date().getTime();
  }
}
