import { Component, input, output } from '@angular/core';
import { Product } from '../_models/Product';

@Component({
  selector: 'app-product-details-view',
  imports: [],
  templateUrl: './product-details-view.component.html',
  styleUrl: './product-details-view.component.css'
})
export class ProductDetailsViewComponent {

  product = input.required<Product>();
  editClicked = output<void>();

  onEdit() {
    this.editClicked.emit();
  }
}
