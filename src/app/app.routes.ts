import { Routes } from '@angular/router';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './_guards/auth.guard';
import { PhotoEditorComponent } from './photo-editor/photo-editor.component';

export const routes: Routes = [
    { path: '', redirectTo: 'products', pathMatch: 'full' },
    { path: 'products', component: ProductListComponent },
    { path: 'products/create', component: CreateProductComponent, canActivate: [authGuard] },
    { path: 'products/:id', component: ProductDetailsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'photos', component: PhotoEditorComponent }
];
