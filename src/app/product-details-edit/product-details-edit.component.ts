import { Component, inject, input, OnInit, output } from '@angular/core';
import { Product } from '../_models/Product';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-product-details-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './product-details-edit.component.html',
  styleUrl: './product-details-edit.component.css'
})
export class ProductDetailsEditComponent implements OnInit {

  product = input.required<Product>();
  saveClicked = output<void>();

  private formBuilder = inject(FormBuilder);
  private productService = inject(ProductService);

  editForm = this.formBuilder.group({
    name: [''],
    description: [''],
    unitsInStock: [''],
    oldPrice: [''],
    price: ['']
  })

  ngOnInit(): void {
    this.editForm.patchValue({
      name: this.product.name,
      description: this.product().description,
      unitsInStock: this.product().unitsInStock.toString(),
      oldPrice: this.product().oldPrice ? this.product().oldPrice!.toString() : '',
      price: this.product().price ? this.product().price.toString() : '',
    })
  }

  onSubmit() {

    // Reactive forms has null as default values so this is omitted by stringifying then parsing
    const updateProduct: Partial<Product> = {
      id: this.product().id, 
      ...JSON.parse(JSON.stringify(this.editForm.value)),
    }

    this.productService.update(this.product().id, updateProduct).subscribe();
    this.saveClicked.emit();
  }
}
