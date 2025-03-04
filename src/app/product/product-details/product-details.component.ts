import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../_services/product.service';
import { Product } from '../../_models/product';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsEditComponent } from "../product-details-edit/product-details-edit.component";
import { ProductDetailsViewComponent } from "../product-details-view/product-details-view.component";
import { forkJoin } from 'rxjs';
import { ProductCardComponent } from "../product-card/product-card.component";
import { ViewportScroller } from '@angular/common';
import { CreateProductComponent } from '../create-product/create-product.component';

@Component({
  selector: 'app-product-details',
  imports: [ReactiveFormsModule, CreateProductComponent, ProductDetailsViewComponent, ProductCardComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private viewPortScroller = inject(ViewportScroller);

  isEdit = false;

  product!: Product;
  recommended!: Product[];

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const productId = params['id'];
      this.loadProducts(productId);
      this.viewPortScroller.scrollToPosition([0, 0]);
    });

  }

  loadProducts(id: any) {
    forkJoin({
      product: this.productService.get(id),
      recommended: this.productService.getRecommended(id)
    }).subscribe(({ product, recommended }) => {
      this.product = product;
      this.recommended = recommended;
    });
  }

  toggleIsEdit() {
    this.isEdit = !this.isEdit;
  }
}
