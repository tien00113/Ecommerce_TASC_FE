import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../models/AppState';
import { OrderRequest } from '../models/OrderRequest';
import { createOrder } from '../ngrx/order/order.action';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { selectOrder } from '../ngrx/order/order.selectors';
import { selectCarts } from '../ngrx/cart/cart.selectors';
import { getUserCart } from '../ngrx/cart/cart.action';
import { CurrencyFormatPipe } from '../currency-format.pipe';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CurrencyFormatPipe]
})
export class OrderComponent implements OnInit {

  constructor(private store: Store<AppState>, private fb: FormBuilder) { }

  orderRequest!: FormGroup;
  order$!: Observable<any>;
  cart: any

  private subscriptions: Subscription = new Subscription();

  ngOnInit() {
    this.orderRequest = this.fb.group({
      receiver: ['', Validators.required],
      email: [''],
      phoneNumber: ['', Validators.required],
      city: ['Hà Nội', Validators.required],
      district: ['Thanh Xuân', Validators.required],
      ward: ['Nhân Chính', Validators.required],
      address: ['', Validators.required],
      paymentMethod: ['VNPay', Validators.required],
      note: [''],
      voucher: ['']
    });

    this.order$ = this.store.select(selectOrder);

    this.store.dispatch(getUserCart());

    this.order$.subscribe(response => {
      if (response && response.paymentUrl) {
        window.location.href = response.paymentUrl;
      }
    })

    this.subscriptions.add(
      this.store.select(selectCarts).subscribe((cart) => {
        this.cart = cart;
        console.log("cart: ", this.cart)
      })
    )

  }

  onSubmitOrder() {
    const city = this.orderRequest.get('city')?.value;
    const district = this.orderRequest.get('district')?.value;
    const ward = this.orderRequest.get('ward')?.value;
    const address = this.orderRequest.get('address')?.value;
    
    const fullAddress = `${address}, ${ward}, ${district}, ${city}`;

    const orderData = {
      receiver: this.orderRequest.get('receiver')?.value,
      email: this.orderRequest.get('email')?.value,
      phoneNumber: this.orderRequest.get('phoneNumber')?.value,
      address: fullAddress,
      paymentMethod: this.orderRequest.get('paymentMethod')?.value,
      note: this.orderRequest.get('note')?.value
    };

    console.log("Giá trị gửi lên: ", orderData);
    this.store.dispatch(createOrder({ order: orderData }));

    
  }

}
