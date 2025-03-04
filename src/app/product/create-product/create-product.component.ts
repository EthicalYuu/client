import { Component, inject, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { NgClass } from '@angular/common';
import { CategoryListComponent } from '../../category-list/category-list.component';
import { ProductService } from '../../_services/product.service';
import { CategoriesService } from '../../_services/categories.service';
import { prepareCreateProduct } from '../../_utils/product.utils';
import { Product } from '../../_models/product';


@Component({
  selector: 'app-create-product',
  imports: [ReactiveFormsModule,
            MatFormFieldModule,
            MatChipsModule,
            MatIconModule,
            CategoryListComponent,
            NgClass],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})

export class CreateProductComponent implements OnInit, OnChanges {

  private productService = inject(ProductService);
  private categoriesService = inject(CategoriesService);
  private toastrService = inject(ToastrService);
  private formBuilder = inject(FormBuilder);

  product = input<Product>();

  isCreateMode = true;

  categories: string[] = [];
  formData = new FormData();

  createForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: [''],
    unitsInStock: [''],
    oldPrice: [''],
    price: [''],
    onSale: [false],
    images: [new FormData()],
  })

  ngOnInit(): void {
    this.categoriesService.getAll().subscribe({
      next: res => {
        this.categories = res.map(c => c.name);
      }
    });

    if (this.product()) {
      this.setEditMode();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product()) {
      this.setEditMode();
    }
  }

  private setEditMode() {

    this.isCreateMode = !this.product();

    this.createForm.patchValue({
      name: this.product()?.name || '',
      description: this.product()?.description || '',
      unitsInStock: this.product()?.unitsInStock.toString() || '',
      oldPrice: this.product()?.oldPrice?.toString() || '',
      price: this.product()?.price?.toString() || '',
      onSale: this.product()?.isOnSale || false
    })
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
      this.formData.append('images', file, file.name);
    });
  }

  onSubmit() {
    if (this.isCreateMode) this.createProduct();
    else this.editProduct();
  }

  createProduct() {
    console.log('Create')
    this.productService.uploadImagesAndCreateProduct(
      this.formData,
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

  editProduct() {
    console.log('Edit')
    this.productService.update(
      this.product()!.id, 
      prepareCreateProduct(this.createForm.value)
    ).subscribe({
      next: _ => {
        this.toastrService.success('Product Edited successfully!');
      },
      error: err => {
        this.toastrService.error(err.error)
      }
    });
  }
}

