import { ListPassItem } from './list-pass-item';
import { List } from './list.model';

export class ListPass extends List {

    items: ListPassItem[];
    type: string;

    constructor(title: string) {
        super(title);
        this.items = [];
        this.type = 'pass';
    }
}
