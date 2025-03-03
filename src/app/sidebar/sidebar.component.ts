import { Component, OnInit, inject } from '@angular/core';
import { CategoriesService } from '../_services/categories.service';
import { Category } from '../_models/Category';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../_services/product.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  private categoriesService = inject(CategoriesService);
  private productService = inject(ProductService);
  private readonly router = inject(Router);

  categories: Category[] = [];

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoriesService.getAll().subscribe({
      next: res => this.categories = res
    });
  }

  filter(name: string) {
    this.router.navigate(['/products'], { queryParams: { categories: name} })
  }
}
