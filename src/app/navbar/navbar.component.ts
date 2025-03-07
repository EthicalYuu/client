import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-navbar',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  private router = inject(Router);
  accountService = inject(AccountService);

  searchForm = new FormGroup({
    query: new FormControl('')
  });

  logout(){
    this.accountService.logout();
  }

  onSubmit() {
    this.router.navigate(['/products'], { queryParams: { query: this.searchForm.get('query')?.value } })
  }
}
