import { Component, input, OnChanges, OnInit, output, SimpleChanges } from '@angular/core';
import { Product } from '../../_models/product';
import { MatChipsModule } from '@angular/material/chips';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-details-view',
  imports: [MatChipsModule, GalleryModule, CurrencyPipe],
  templateUrl: './product-details-view.component.html',
  styleUrl: './product-details-view.component.css'
})
export class ProductDetailsViewComponent implements OnChanges {
 
  items: GalleryItem[] = [];

  product = input.required<Product>();
  editClicked = output<void>();

  ngOnChanges(): void {
    this.items = this.product().imageUrls.map(
      url => new ImageItem({ src: url })
    );
  }

  onEdit() {
    this.editClicked.emit();
  }
}
