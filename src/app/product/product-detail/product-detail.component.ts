import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyFormatPipe } from '../../currency-format.pipe';
import { ProductService } from '../../ngrx/product/product.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../models/AppState';
import { getProductDetail, getProductDetailFailure } from '../../ngrx/product/product.action';
import { firstValueFrom } from 'rxjs';

interface Image {
  url: string;
  selected: boolean;
}

interface Product {
  name: any;
  price:any;
  colorArray: [];
  sizeArray: [];
  imageList: [];
  description: any;
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  standalone: true,
  imports: [CommonModule, CurrencyFormatPipe]
})
export class ProductDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute, private productService: ProductService, private store: Store<AppState>, private router: Router) {
    // this.images[0].selected = true;
  }

  product: any =  {colorArray: [], sizeArray: [], imageArray: []};
  images: Image[] = [];
  colors: string[] = [];
  sizes: string[] = [];
  selectedImage: string = '';
  selectedColor: string = '';
  selectedSize: string = '';

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));

    this.productDetail(productId);
    this.store.dispatch(getProductDetail({productId}))
    this.store.select(state => state.product.product).subscribe(
      product => {
        this.product = product;
        this.initImages();
      }
    )
  }

  async productDetail( productId: number) {
    try {
      const action$ = this.productService.getProductDetail(productId);
      const action = await firstValueFrom(action$);
      this.store.dispatch(action);
      this.router.navigate(['/product', productId]);

    } catch (error) {
      console.log("error get all product pageable!", error);
      this.store.dispatch(getProductDetailFailure({ error }));
    }
  }

  initImages(): void {
    if (this.product && this.product.imageList && this.product.imageList.length > 0) {
      this.images = this.product.imageList.map((imageUrl: string) => {
        return { url: imageUrl, selected: false };
      });
      this.selectedImage = this.images[0].url;
    }
  }

  selectColor(color: string) {
    this.selectedColor = color;
  }

  selectSize(size: string) {
    this.selectedSize = size;
  }

  selectImage(imageUrl: string) {
    this.selectedImage = imageUrl;
    this.images.forEach(image => {
      image.selected = image.url === imageUrl;
    });
  }
}
