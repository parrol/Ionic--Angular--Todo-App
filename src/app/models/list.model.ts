/**
 * Super class for Todo Lists and Password Lists.
 * Todo Lists: a list of items that have a checkbox to mark them as done or pending.
 * Password Lists: a list of items, each having an user and a password.
 */
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
