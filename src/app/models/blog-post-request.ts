import { Photo } from "./photo";
import { User } from "./user";

export class BlogPostRequest {
    id: number;
    body: string;
    created_at: string;
    updated_at: string;
    heading: string;
    subheading: string;
    slug: string;
    meta: string;
    version: number;
    photo_id: number;
    user_id: number;

    //assign vals from json to properties
    constructor(values: Object = {}) { 
        Object.assign(this, values);
    }
}