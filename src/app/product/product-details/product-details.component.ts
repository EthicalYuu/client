import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../_services/product.service';
import { Product } from '../../_models/Product';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsEditComponent } from "../product-details-edit/product-details-edit.component";
import { ProductDetailsViewComponent } from "../product-details-view/product-details-view.component";
import { forkJoin } from 'rxjs';
import { ProductCardComponent } from "../product-card/product-card.component";
import { PhotoEditorComponent } from "../../photo-editor/photo-editor.component";

@Component({
  selector: 'app-product-details',
  imports: [ReactiveFormsModule, ProductDetailsEditComponent, ProductDetailsViewComponent, ProductCardComponent, PhotoEditorComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);

  isEdit = false;

  product!: Product;
  recommended!: Product[];

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    this.loadProducts(id);
  }

  loadProducts(id: any) {
    forkJoin({
      product: this.productService.get(id), 
      recommended: this.productService.getRecommended(id) 
    }).subscribe(({product, recommended}) => {
      console.log(product);
      this.product = product;
      this.recommended = recommended;
    });
  }

  toggleIsEdit() {
    this.isEdit = !this.isEdit;
  }
}
