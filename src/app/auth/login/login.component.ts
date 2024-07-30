import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../models/AppState';
import {
  login
} from '../../ngrx/auth/auth.action';
import {
  selectError,
  selectIsLoading,
  selectToken,
} from '../../ngrx/auth/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  token: string | null = null;
  error: string | null = null;
  isLoading = false;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() {
    this.subscriptions.add(
      this.store.select(selectToken).subscribe((token) => {
        this.token = token;
        if (token) {
          this.router.navigate(['/']);
        }
      })
    );

    this.subscriptions.add(
      this.store.select(selectError).subscribe((error) => {
        this.error = error;
        if (error) {
          alert(`Lỗi: ${error}`);
        }
      })
    );

    this.subscriptions.add(
      this.store
        .select(selectIsLoading)
        .subscribe((isLoading) => (this.isLoading = isLoading))
    );
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.store.dispatch(login({ auth: { email, password } }));
    }
  }

  ngOnDestroy() {
    // Hủy bỏ tất cả các subscription khi component bị phá hủy
    this.subscriptions.unsubscribe();
  }
}
