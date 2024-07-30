import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../models/AppState';
import { getOrderInfo } from '../../ngrx/order/order.action';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { selectOrder } from '../../ngrx/order/order.selectors';
import { CurrencyFormatPipe } from '../../currency-format.pipe';
import { getProductVariant } from '../../ngrx/product/product.action';
import { selectVariants } from '../../ngrx/product/product.selectors';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
  standalone: true,
  imports: [CommonModule, CurrencyFormatPipe]
})
export class OrderDetailComponent implements OnInit {

  constructor(private store: Store<AppState>) { }
  private subscriptions: Subscription = new Subscription();

  order: any;

  ngOnInit() {
    this.store.dispatch(getOrderInfo({orderId: "240730CLTTCMXDV"}));

    this.subscriptions.add(
      this.store.select(selectOrder).subscribe((order) => {
        this.order = order;
        console.log("order: ", this.order)
        if (order && order.orderItems) {
          order.orderItems.forEach((item: any) => {
            this.store.dispatch(getProductVariant({ id: item.productId }));
          });
        }
      })
    )
    this.subscriptions.add(
      this.store.select(selectVariants).subscribe(variants => {
        if (this.order && this.order.orderItems) {
          // Create a new order object with updated orderItems
          this.order = {
            ...this.order,
            orderItems: this.order.orderItems.map((item: any) => ({
              ...item,
              variant: variants[item.productId] // Add variant data to the item
            }))
          };
        }
      })
    );
    
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
