import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriesService } from '../_services/categories.service';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CategoryListComponent } from "../category-list/category-list.component";
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../_services/product.service';
import { ProductCreate } from '../_models/Product';
import { prepareCreateProduct } from '../_utils/product.utils';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-create-product',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatChipsModule, MatIconModule, CategoryListComponent, NgClass],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})

export class CreateProductComponent implements OnInit {

  private productService = inject(ProductService);
  private categoriesService = inject(CategoriesService);
  private toastrService = inject(ToastrService);
  private formBuilder = inject(FormBuilder);

  categories: string[] = [];

  createForm = this.formBuilder.group({
    name: [null, Validators.required],
    description: [null],
    unitsInStock: [null],
    oldPrice: [null],
    price: [null], 
    onSale: [false]
  })

  ngOnInit(): void {
    this.categoriesService.getAll().subscribe({
      next: res => {
        this.categories = res.map(c => c.name);
      }
    });
  }

  updateCategories($event: string[]) {
    this.categories = $event;
  }

  isOnSale() {
    return this.createForm.get('onSale')?.value || false;
  }

  onSubmit() {
    console.log(this.createForm.value)
    this.productService.create(
      prepareCreateProduct(this.createForm.value)
    ).subscribe({
      next: _ => {
        this.toastrService.success('Product created successfully!');
      },
      error: err => {
        this.toastrService.error(err.error)
      }
    });
  }
}

