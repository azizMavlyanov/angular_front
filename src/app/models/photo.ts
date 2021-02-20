export class Photo {
    id: number;
    image_path: string;
    title: string;
    created_at: string;
    updated_at: string;

    //assign vals from json to properties
    constructor(values: Object = {}) { 
        Object.assign(this, values);
    }
}