import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Product, ProductCreate } from '../_models/Product';
import { ProductParams } from '../_models/ProductParams';
import { Image } from '../_models/Image';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  products = signal<Product[]>([]);

  private productParams = signal<ProductParams>({
    pageNumber: 1,
    pageSize: 25
  });

  getAll() {

    const params = this.buildParams(this.productParams());

    return this.http.get<Product[]>(`${this.baseUrl}/products`, { params: params }).subscribe({
      next: res => this.products.set(res)
    });
  }

  private buildParams(productParams: ProductParams): HttpParams {

    let httpParams = new HttpParams();

    for (const [key, value] of Object.entries(productParams)) {
      httpParams = httpParams.append(key, value);
    }

    return httpParams;
  }

  updateQueryParams(params: ProductParams) {
    this.productParams.set(params);
  }

  get(id: any) {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
  }

  getRecommended(id: any) {
    return this.http.get<Product[]>(`${this.baseUrl}/products/${id}/recommended`);
  }

  update(id: number, product: Partial<Product>) {
    return this.http.put(`${this.baseUrl}/products/${id}`, product, { responseType: 'text' });
  }

  uploadImage(formData: FormData) {
    return this.http.post(`${this.baseUrl}/upload`, formData);
  }

  create(product: ProductCreate) {
    return this.http.post(`${this.baseUrl}/products/`, product);
  }

  deleteImage(image: Image) {
    return this.http.delete(`${this.baseUrl}/products/delete-image/${image.id}`);
  }
}