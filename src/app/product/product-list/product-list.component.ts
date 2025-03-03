import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../_services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ProductCardComponent } from "../product-card/product-card.component";
import { ProductParams } from '../../_models/productParams';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  private readonly route = inject(ActivatedRoute);
  productService = inject(ProductService);

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {

      const productParams: ProductParams = {
        pageSize: Number(params.get('pageSize')) || 30,
        tag: params.get('tag') || undefined,
        categories: params.get('categories') || undefined, 
        query: params.get('query') || undefined
      };

      this.productService.getAll(productParams);
    });
  }
}
