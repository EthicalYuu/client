import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CreateProductComponent } from './create-product/create-product.component';

export const routes: Routes = [
    {path:'', redirectTo: 'products', pathMatch:'full'},
    { path: 'products', component: ProductListComponent }, 
    { path: 'products/create', component: CreateProductComponent }, 
    { path: 'products/:id', component: ProductDetailsComponent}
];
