import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductParams } from '../_models/ProductParams';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  imports: [RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  private readonly route = inject(ActivatedRoute);
  productService = inject(ProductService);

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      let httpParams = new HttpParams();

      params.keys.map(key => {
        if (params.get(key)) {
          httpParams = httpParams.append(key, params.get(key)!);
        }
      });

      this.productService.getAll(httpParams);
    });
  }
}
