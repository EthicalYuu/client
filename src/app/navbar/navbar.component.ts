import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { ProductParams } from '../_models/ProductParams';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  private router = inject(Router);

  searchForm = new FormGroup({
    query: new FormControl('')
  });

  onSubmit() {
    this.router.navigate(['/products'], { queryParams: { query: this.searchForm.get('query')?.value} })
  }
}
