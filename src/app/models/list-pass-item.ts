export class ListPassItem {

    user: string;
    pass: string;
    showPassword = false;
    showPasswordIcon = 'eye-off-outline';

    constructor(user: string = '', pass: string = '') {
        this.user = user;
        this.pass = pass;
    }
}
