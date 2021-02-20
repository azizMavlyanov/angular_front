import { Photo } from "./photo";

export class User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
    photo: Photo;

    //assign vals from json to properties
    constructor(values: Object = {}) { 
        Object.assign(this, values);
    }
}