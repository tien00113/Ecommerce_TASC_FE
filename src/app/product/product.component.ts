import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  Component,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CurrencyFormatPipe } from '../currency-format.pipe';
import { AppState } from '../models/AppState';
import { CartItem } from '../models/CartItem';
import { addToCart } from '../ngrx/cart/cart.action';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, CurrencyFormatPipe, FormsModule],
})
export class ProductComponent implements OnInit {
  @ViewChild(ModalComponent) modalComponent!: ModalComponent;
  @Input() product: any;

  private subscriptions: Subscription = new Subscription();

  selectedColor: string = '';
  selectedSize: string = '';
  showMore: Boolean = true;
  modalOpen: Boolean = false;
  availableSizes: string[] = [];
  availableColors: string[] = [];
  stock: number = 0;
  quantity: number = 1;
  currentProduct: any = null;
  imageUrl: string[] = [];
  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit() {
    this.stock = this.product.stock;
    if (this.product?.variants) {
      this.imageUrl = this.product.variants
        .map((variant: any) => variant.imageUrl)
        .filter(
          (url: string, index: number, self: string[]) =>
            self.indexOf(url) === index
        );
    }
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });

  }

  openModal(product: any) {
    this.currentProduct = product;
    this.modalOpen = true;
    this.resetSelected();
  }

  closeModal() {
    this.modalOpen = false;
    this.currentProduct = null;
  }

  productDetail(productId: number) {
    this.router.navigate(['/product', productId]);
  }

  showOrHideElements(showModal: boolean) {
    this.modalOpen = showModal;
    if (!showModal) {
      this.showSocialElements(false);
    }
  }

  showSocialElements(show: boolean) {
    const socialElements = document.querySelectorAll(
      '.product-grid2 .social li'
    );
    socialElements.forEach((element: any) => {
      element.style.display = show ? 'block' : 'none';
    });
  }

  setShowMore() {
    this.showMore = true;
    // this.modalOpen = false;
  }

  selectColor(color: string) {
    this.selectedColor = color;
    this.availableSizes = this.product.variants
      .filter((variant: any) => variant.color === color)
      .map((variant: any) => variant.size);
    this.updateAvailableQuantities();
    console.log('đã chọn màu', color);
  }

  selectSize(size: string) {
    this.selectedSize = size;
    this.availableColors = this.product.variants
      .filter((variant: any) => variant.size === size)
      .map((variant: any) => variant.color);
    this.updateAvailableQuantities();
    console.log('đã chọn size', size);
  }

  resetSelected() {
    this.selectedColor = '';
    this.selectedSize = '';
    this.availableSizes = [];
    this.availableColors = [];
    this.stock = this.currentProduct.stock;
  }

  isSizeAvailable(size: string): boolean {
    if (!this.selectedColor) {
      return true;
    }
    return !!this.product.variants.find(
      (variant: any) =>
        variant.color === this.selectedColor &&
        variant.size === size &&
        variant.quantity > 0
    );
  }

  isColorAvailable(color: string): boolean {
    if (!this.selectedSize) {
      return true;
    }
    return !!this.product.variants.find(
      (variant: any) =>
        variant.color === color &&
        variant.size === this.selectedSize &&
        variant.quantity > 0
    );
  }

  add(color: string, size: string, quantity: number) {
    const variants = this.product.variants.find(
      (prd: any) => prd.color === color && prd.size === size
    );

    const cartItem: CartItem = {
      productId: variants?.id,
      quantity: quantity,
    };

    console.log('cartItem là: ', cartItem);

    this.store.dispatch(addToCart({ cartItem }));
  }

  private updateAvailableQuantities() {
    if (this.selectedColor && this.selectedSize) {
      // Khi người dùng chọn cả màu và kích thước
      this.stock = this.product.variants
        .filter(
          (variant: any) =>
            variant.color === this.selectedColor &&
            variant.size === this.selectedSize
        )
        .reduce((total: number, variant: any) => total + variant.quantity, 0);
    } else if (this.selectedColor) {
      // Khi người dùng chỉ chọn màu
      this.stock = this.product.variants
        .filter((variant: any) => variant.color === this.selectedColor)
        .reduce((total: number, variant: any) => total + variant.quantity, 0);
    } else if (this.selectedSize) {
      // Khi người dùng chỉ chọn kích thước
      this.stock = this.product.variants
        .filter((variant: any) => variant.size === this.selectedSize)
        .reduce((total: number, variant: any) => total + variant.quantity, 0);
    } else {
      // Nếu không chọn màu hoặc kích thước, hiển thị số lượng gốc của sản phẩm
      this.stock = this.product.stock;
    }
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
