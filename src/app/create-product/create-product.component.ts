import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriesService } from '../_services/categories.service';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CategoryListComponent } from "../category-list/category-list.component";
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../_services/product.service';
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
  formData = new FormData();

  createForm = this.formBuilder.group({
    name: [null, Validators.required],
    description: [null],
    unitsInStock: [null],
    oldPrice: [null],
    price: [null],
    onSale: [false],
    images: [new FormData()],
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

  uploadFile(files: FileList | null) {

    if (files == null || files.length === 0) {
      return;
    }

    Array.from(files).forEach(file => {
      this.formData.append('files', file, file.name);
    });
  }

  onSubmit() {

    this.productService.uploadImage(this.formData).subscribe();

    // this.createForm.patchValue({
    //   images: this.formData
    // });

    // this.productService.create(
    //   prepareCreateProduct(this.createForm.value)
    // ).subscribe({
    //   next: _ => {
    //     this.toastrService.success('Product created successfully!');
    //   },
    //   error: err => {
    //     this.toastrService.error(err.error)
    //   }
    // });
  }
}

