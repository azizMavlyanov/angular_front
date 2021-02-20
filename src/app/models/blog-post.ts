import { Photo } from "./photo";
import { User } from "./user";

export class BlogPost {
    id: number;
    body: string;
    created_at: string;
    updated_at: string;
    heading: string;
    subheading: string;
    slug: string;
    meta: string;
    version: number;
    photo: Photo;
    user: User;

    //assign vals from json to properties
    constructor(values: Object = {}) { 
        Object.assign(this, values);
    }
}