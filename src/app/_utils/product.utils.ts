import { ProductCreate } from "../_models/Product";

export function prepareCreateProduct(formValue: any): ProductCreate {

    const productData: ProductCreate = {
        name: formValue.name?.trim() || '',
        description: formValue.description?.trim() || undefined,
        details: formValue.details?.trim() || undefined,
        isOnSale: formValue.isOnSale ?? undefined,
        oldPrice: formValue.oldPrice ? formValue.oldPrice : undefined,
        price: formValue.price ? formValue.price : undefined,
        unitsInStock: formValue.unitsInStock ? formValue.unitsInStock : undefined,
    };

    return Object.fromEntries(
        Object.entries(productData).filter(([_, value]) => value !== undefined)
    ) as ProductCreate;
}
