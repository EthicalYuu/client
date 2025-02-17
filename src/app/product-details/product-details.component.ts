import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_models/Product';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsEditComponent } from "../product-details-edit/product-details-edit.component";
import { ProductDetailsViewComponent } from "../product-details-view/product-details-view.component";

@Component({
  selector: 'app-product-details',
  imports: [ReactiveFormsModule, ProductDetailsEditComponent, ProductDetailsViewComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);

  isEdit = false;

  product!: Product;

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    this.loadProduct(id);
  }

  loadProduct(id: any) {
    this.productService.get(id).subscribe({
      next: res => {
        this.product = res;
      }
    });
  }

  toggleIsEdit() {
    this.isEdit = !this.isEdit;
  }
}
