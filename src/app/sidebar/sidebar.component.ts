import { Component, OnInit, inject } from '@angular/core';
import { CategoriesService } from '../_services/categories.service';
import { Category } from '../_models/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  private categoriesService = inject(CategoriesService);
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
