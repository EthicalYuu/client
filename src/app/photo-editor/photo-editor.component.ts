import { Component, inject, input } from '@angular/core';
import { Product } from '../_models/product';
import { ProductService } from '../_services/product.service';
import { Image } from '../_models/image';

@Component({
  selector: 'app-photo-editor',
  imports: [],
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.css'
})
export class PhotoEditorComponent {

  // product = input.required<Product>();
  
  // productService = inject(ProductService);

  // removeImage(image: Image) {
  //   this.productService.deleteImage(image).subscribe();
  // }
}
