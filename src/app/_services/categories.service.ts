import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Category } from '../_models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  getAll() {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }
}
