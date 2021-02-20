export class SignUp {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;

    //assign vals from json to properties
    constructor(values: Object = {}) { 
        Object.assign(this, values);
    }
}