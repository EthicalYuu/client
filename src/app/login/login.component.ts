import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  private formBuilder = inject(FormBuilder);

  loginForm = this.formBuilder.group({
    // email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required]],
    password: ['', Validators.required]
  });

  private accountService = inject(AccountService);
  private router = inject(Router);

  model: any = {};

  hasError(formControl: string, error: string) {
    return this.loginForm.get(formControl)?.hasError(error);
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    this.accountService.login(this.loginForm.value).subscribe({
      next: _ => this.router.navigate(['/products'])
    });
  }
}