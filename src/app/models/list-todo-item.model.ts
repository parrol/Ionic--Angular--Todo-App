/**
 * An item/task ect. that belongs to a Todo list.
 */
export class ListTodoItem {

    //description
    desc: string;
    //true is the item on the list is "done" (checkbox marked), false otherwise.
    done: boolean;

    constructor( desc: string) {
        this.desc = desc;
        this.done = false;
    }
};
