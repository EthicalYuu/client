import { Component, OnInit, inject } from '@angular/core';
import { CategoriesService } from '../_services/categories.service';
import { Category } from '../_models/category';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  private categoriesService = inject(CategoriesService);
  private readonly router = inject(Router);
  private readonly viewPortScroller = inject(ViewportScroller);

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
    this.viewPortScroller.scrollToPosition([0, 0]);
  }
}
