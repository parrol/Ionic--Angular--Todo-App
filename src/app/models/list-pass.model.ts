import { ListPassItem } from './list-pass-item';
import { List } from './list.model';

/**
 * Password List.
 */
export class ListPass extends List {

    items: ListPassItem[];
    //identifies the list as a password list.
    type: string;

    constructor(title: string) {
        super(title);
        this.items = [];
        this.type = 'pass';
    }
}
