import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../_services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ProductCardComponent } from "../product-card/product-card.component";
import { ProductParams } from '../../_models/productParams';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent, PaginationModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  private readonly route = inject(ActivatedRoute);
  productService = inject(ProductService);
  viewPortScroller = inject(ViewportScroller);

  productParams: ProductParams = {
    pageNumber: 1,
    pageSize: 28,
    tag: undefined,
    categories: undefined,
    query: undefined
  };

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {

      this.productParams.pageNumber = Number(params.get('pageNumber')) || this.productParams.pageNumber;
      this.productParams.pageSize = Number(params.get('pageSize')) || this.productParams.pageSize;
      this.productParams.tag = params.get('tag') || undefined;
      this.productParams.categories = params.get('categories') || undefined;
      this.productParams.query = params.get('query') || undefined;

      this.loadProducts();
    });
  }

  pageChanged($event: PageChangedEvent) {
    if ($event.page !== this.productParams.pageNumber) {
      this.productParams.pageNumber = $event.page;
      this.loadProducts();
      this.viewPortScroller.scrollToPosition([0, 0]);
    }
  }

  private loadProducts() {
    this.productService.getAll(this.productParams);
  }
}
