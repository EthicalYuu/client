import { HttpParams } from "@angular/common/http";
import { ProductCreate } from "../_models/product";
import { ProductParams } from "../_models/productParams";

export function prepareCreateProduct(formValue: any): ProductCreate {

    const productData: ProductCreate = {
        name: formValue.name?.trim() || '',
        description: formValue.description?.trim() || undefined,
        details: formValue.details?.trim() || undefined,
        isOnSale: formValue.isOnSale ?? undefined,
        oldPrice: formValue.oldPrice ? formValue.oldPrice : undefined,
        price: formValue.price ? formValue.price : undefined,
        unitsInStock: formValue.unitsInStock ? formValue.unitsInStock : undefined,
        categories: formValue.categories ? formValue.categories : []
    };

    return Object.fromEntries(
        Object.entries(productData).filter(([_, value]) => value !== undefined)
    ) as ProductCreate;
}

export function buildParams(productParams: ProductParams): HttpParams {

    let httpParams = new HttpParams();

    for (const [key, value] of Object.entries(productParams)) {
        if(value != null && value != undefined){
            httpParams = httpParams.append(key, value);
        }
    }

    return httpParams;
}