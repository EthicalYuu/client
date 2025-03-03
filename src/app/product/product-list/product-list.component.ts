import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../_services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ProductCardComponent } from "../product-card/product-card.component";

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

      params.keys.map(key => {
        if (params.get(key)) {
          this.productService.updateQueryParams({
            pageNumber: Number(params.get('pageNumber')),
            pageSize: Number(params.get('pageSize')),
            tag: params.get('tag')!,
            category: params.get('category')!,
            query: params.get('query')!,
          }
          )
        }
      });

      this.productService.getAll();
    });
  }
}
