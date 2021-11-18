import { ListTodoItem } from './list-todo-item.model';
import { List } from './list.model';

export class ListTodo extends List {

    doneAt: Date;
    done: boolean;
    items: ListTodoItem[];
    type: string;

    constructor(title: string) {
        super(title);
        this.done = false;
        this.items = [];
        this.type = 'todo';
    }
}
