import { ListTodoItem } from './list-todo-item.model';
import { List } from './list.model';

/**
 * Todo List.
 */

export class ListTodo extends List {

    doneAt: Date;
    //true if all items inside the list are also done, false otherwise.
    done: boolean;
    items: ListTodoItem[];
    //identifies the list as a todo list.
    type: string;

    constructor(title: string) {
        super(title);
        this.done = false;
        this.items = [];
        this.type = 'todo';
    }
}
