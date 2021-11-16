import { ListItem } from './list-item.model';

export class List {

    id: number;
    title: string;
    createdAt: Date;
    doneAt: Date;
    done: boolean;
    items: ListItem[];

    constructor(title: string) {

        this.title = title;
        this.createdAt = new Date();
        this.done = false;
        this.items = [];
        this.id = new Date().getTime();
    }
};
