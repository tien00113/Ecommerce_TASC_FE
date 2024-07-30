import { Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { OrderComponent } from './order/order.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: "product/:id", component:ProductDetailComponent
    },
    {
        path: "cart", component:CartComponent
    },
    {
        path: "login", component:LoginComponent
    },
    {
        path: "register", component:RegisterComponent
    },
    {
        path: "checkout", component: OrderComponent
    },
    {
        path: "payment-result", component: PaymentComponent
    },
    {
        path: "order/:id", component: OrderDetailComponent
    }
    ,
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
