import { Category } from "./Category";
import { Image } from "./Image";

export interface Product {
    id: number;
    name: string;
    description?: string;
    details?: string;
    isOnSale: boolean;
    oldPrice?: number;
    price: number;
    unitsInStock: number;
    images: Image[];
    manuals: Manual[];
    categories: Category[];
    tags: Tag[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Manual {
    // Define the properties for Manual as needed
}

export interface Tag {
    // Define the properties for Tag as needed
}

export interface ProductCreate {
    name: string;
    description?: string;
    details?: string;
    isOnSale?: boolean;
    oldPrice?: number;
    price?: number;
    unitsInStock?: number;
    categories?: string[];
    images?: FormData;
}
