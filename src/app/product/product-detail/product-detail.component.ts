import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { CurrencyFormatPipe } from '../../currency-format.pipe';
import { AppState } from '../../models/AppState';
import {
  getProductDetail,
  getProductDetailFailure,
} from '../../ngrx/product/product.action';
import { ProductService } from '../../ngrx/product/product.service';
import { CartItem } from '../../models/CartItem';
import { addToCart } from '../../ngrx/cart/cart.action';

interface Image {
  url: string;
  selected: boolean;
}


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  standalone: true,
  imports: [CommonModule, CurrencyFormatPipe],
})
export class ProductDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private store: Store<AppState>,
    private router: Router
  ) {
    // this.images[0].selected = true;
  }

  product: any = { colorArray: [], sizeArray: [], imageArray: [] };
  images: Image[] = [];
  colors: string[] = [];
  sizes: string[] = [];
  selectedImage: string = '';
  selectedColor: string = '';
  selectedSize: string = '';
  availableSizes: string[] = [];
  availableColors: string[] = [];
  quantity: number = 1;
  stock: number = 0;

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));

    this.productDetail(productId);
    this.store.dispatch(getProductDetail({ productId }));
    this.store
      .select((state) => state.product.product)
      .subscribe((product) => {
        this.stock = product.stock
        this.product = product;
        this.initImages();
      });
  }

  async productDetail(productId: number) {
    try {
      const action$ = this.productService.getProductDetail(productId);
      const action = await firstValueFrom(action$);
      this.store.dispatch(action);
      this.router.navigate(['/product', productId]);
    } catch (error) {
      console.log('error get all product pageable!', error);
      this.store.dispatch(getProductDetailFailure({ error }));
    }
  }

  initImages(): void {
    if (
      this.product &&
      this.product.variants &&
      this.product.variants.length > 0
    ) {
      this.images = this.product.variants.map((prd: any) => {
        return { url: prd.imageUrl, selected: false };
      });
      this.selectedImage = this.images[0].url;
      console.log('images là: ', this.images);
    }
  }

  add(color: string, size: string, quantity: number) {
    const variants = this.product.variants.find(
      (prd: any) => prd.color === color && prd.size === size
    );

    const cartItem: CartItem = {
      productId: variants?.id,
      quantity: quantity,
    };

    console.log("cartItem là: ", cartItem);

    this.store.dispatch(addToCart({ cartItem }));

  }

  selectColor(color: string) {
    this.selectedColor = color;
    this.availableSizes = this.product.variants
      .filter((variant: any) => variant.color === color)
      .map((variant: any) => variant.size);
    this.updateAvailableQuantities();
  }

  selectSize(size: string) {
    this.selectedSize = size;
    this.availableColors = this.product.variants
      .filter((variant: any) => variant.size === size)
      .map((variant: any) => variant.color);
    this.updateAvailableQuantities();
  }

  selectImage(imageUrl: string) {
    this.selectedImage = imageUrl;
    this.images.forEach((image) => {
      image.selected = image.url === imageUrl;
    });
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

  private updateAvailableQuantities() {
    if (this.selectedColor && this.selectedSize) {
      this.stock = this.product.variants
        .filter(
          (variant: any) =>
            variant.color === this.selectedColor &&
            variant.size === this.selectedSize
        )
        .reduce((total: number, variant: any) => total + variant.quantity, 0);
    } else if (this.selectedColor) {
      this.stock = this.product.variants
        .filter((variant: any) => variant.color === this.selectedColor)
        .reduce((total: number, variant: any) => total + variant.quantity, 0);
    } else if (this.selectedSize) {
      this.stock = this.product.variants
        .filter((variant: any) => variant.size === this.selectedSize)
        .reduce((total: number, variant: any) => total + variant.quantity, 0);
    } else {
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
