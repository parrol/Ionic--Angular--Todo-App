import { ListTodoItem } from './list-todo-item.model';

export class List {

    id: number;
    title: string;
    createdAt: Date;

    constructor(title: string) {

        this.title = title;
        this.createdAt = new Date();
        this.id = new Date().getTime();
    }
};
