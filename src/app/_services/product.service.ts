import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { switchMap } from 'rxjs';
import { buildParams } from '../_utils/product.utils';
import { PaginatedResult } from '../_models/pagination';
import { Product, ProductCreate } from '../_models/product';
import { ProductParams } from '../_models/productParams';
import { Image } from '../_models/image';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  paginatedResult = signal<PaginatedResult<Product[]> | null>(null);

  // private productParams = signal<ProductParams>({});

  // updateQueryParams(params: ProductParams) {
  //   this.productParams.set(params);
  // }

  getAll(params: ProductParams) {

    return this.http.get<Product[]>(`${this.baseUrl}/products`, { observe: 'response', params: buildParams(params) }).subscribe({
      next: res => this.setPaginationResponse(res)
    });
  }

  private setPaginationResponse(response: HttpResponse<Product[]>) {
    this.paginatedResult.set({
      result: response.body as Product[],
      pagination: JSON.parse(response.headers.get('Pagination')!)
    })
  }

  get(id: any) {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
  }

  getRecommended(id: any) {
    return this.http.get<Product[]>(`${this.baseUrl}/products/${id}/recommended`);
  }

  update(id: number, product: ProductCreate) {
    return this.http.put(`${this.baseUrl}/products/${id}`, product, { responseType: 'text' });
  }

  uploadImages(formData: FormData) {
    return this.http.post<string[]>(`${this.baseUrl}/upload`, formData);
  }

  create(product: ProductCreate) {
    return this.http.post(`${this.baseUrl}/products/`, product);
  }

  uploadImagesAndCreateProduct(formData: FormData, product: ProductCreate) {
    return this.uploadImages(formData).pipe(
      switchMap((imageUrls: string[]) => {
        product.imageUrls = imageUrls;
        return this.create(product);
      })
    );
  }

  deleteImage(image: Image) {
    return this.http.delete(`${this.baseUrl}/products/delete-image/${image.id}`);
  }
}
