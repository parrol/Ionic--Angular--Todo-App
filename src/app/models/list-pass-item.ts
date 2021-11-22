/**
 * an item: a combination of user and password that belongs to an password list.
 */
export class ListPassItem {

    user: string;
    pass: string;
    //true hides the password replacing each letter with asterisks, false leaves it as it is.
    showPassword = false;
    //eye-off-outline name of the icon shown when a password is hidden.
    showPasswordIcon = 'eye-off-outline';

    constructor(user: string = '', pass: string = '') {
        this.user = user;
        this.pass = pass;
    }
}
