import { Component, inject, input, OnInit, output } from '@angular/core';
import { Product } from '../../_models/product';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../_services/product.service';
import { CategoryListComponent } from "../../category-list/category-list.component";
import { ToastrService } from 'ngx-toastr';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../environments/environment.development';
import { AccountService } from '../../_services/account.service';
import { CommonModule } from '@angular/common';
import { HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-product-details-edit',
  imports: [ReactiveFormsModule, CategoryListComponent, GalleryModule, FileUploadModule, CommonModule],
  templateUrl: './product-details-edit.component.html',
  styleUrl: './product-details-edit.component.css'
})
export class ProductDetailsEditComponent implements OnInit {

  product = input.required<Product>();
  saveClicked = output<void>();
  categories: string[] = [];
  galleryItems: GalleryItem[] = [];
  formData = new FormData();


  private formBuilder = inject(FormBuilder);
  private toastrService = inject(ToastrService);
  private productService = inject(ProductService);
  private accountService = inject(AccountService);

  editForm = this.formBuilder.group({
    image: [null],
    name: [''],
    description: [''],
    unitsInStock: [''],
    oldPrice: [''],
    price: ['']
  })

  ngOnInit(): void {
    // this.loadGallery();
    this.loadCategories();
    this.patchEditForm();
  }

  // private loadGallery() {
  //   this.galleryItems = this.product().images.map(
  //     image => new ImageItem({ src: image.url })
  //   );
  // }

  private loadCategories() {
    this.categories = this.product().categories.map(c => c.name);
  }

  private patchEditForm() {
    this.editForm.patchValue({
      name: this.product().name,
      description: this.product().description,
      unitsInStock: this.product().unitsInStock.toString(),
      oldPrice: this.product().oldPrice ? this.product().oldPrice!.toString() : '',
      price: this.product().price ? this.product().price.toString() : '',
    });
  }

  updateCategories($event: string[]) {
    this.categories = $event;
  }

  onSubmit() {

    // Reactive forms has null as default values so this is omitted by stringifying then parsing - find a scalable fix later
    const updateProduct: Partial<Product> = {
      id: this.product().id,
      categories: this.categories,
      images: this.formData, 
      ...JSON.parse(JSON.stringify(this.editForm.value)),
    }

    this.productService.update(this.product().id, updateProduct).subscribe({
      next: _ => {
        this.toastrService.success('Product edited successfully!');
        this.saveClicked.emit();
      }
    });

    // this.productService.uploadImage(this.formData).subscribe();
  }
}
