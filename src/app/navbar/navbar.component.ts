import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, take } from 'rxjs';
import { AppState } from '../models/AppState';
import { selectIsLogin, selectUser } from '../ngrx/auth/auth.selectors';
import { getUserInfo, loginSuccess, logout } from '../ngrx/auth/auth.action';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class NavbarComponent implements OnInit {
  user: any;
  isLoggedIn: boolean = false;

  constructor(private router: Router, private store: Store<AppState>,) { }

  private subscriptions: Subscription = new Subscription();
  ngOnInit() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('jwt');
      if (token) {
        this.store.dispatch(loginSuccess({ token }));
        this.store.dispatch(getUserInfo());
      }

      this.subscriptions.add(
        this.store.select(selectIsLogin).subscribe((isLogin) => {
          this.isLoggedIn = isLogin;
          console.log("trạng thái đăng nhập: ", isLogin);

          if (isLogin) {
            this.subscriptions.add(
              this.store.select(selectUser).subscribe((user) => {
                this.user = user;
                console.log("user là: ", this.user);
              })
            );
          } else {
            this.user = null;
          }
        })
      );
    }
  }

  navigateToCart() {
    this.router.navigate(['/cart']);
  }

  show: Boolean = false;

  showFilter() {
    this.show = true;
  }

  closeFilter() {
    this.show = false;
  }

  logout(){
    this.store.dispatch(logout());
  }

  login(){
    this.router.navigate(['/login']);
  }

}
