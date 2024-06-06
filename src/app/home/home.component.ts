import { Component, OnInit } from '@angular/core';
import { MainCarouselComponent } from './main-carousel/main-carousel.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from '../product/product.component';
import { CommonModule } from '@angular/common';
import { ProductService } from '../ngrx/product/product.service';
import { ProductFilterRequest } from '../models/ProductFilterRequest';
import { AppState } from '../models/AppState';
import { Store } from '@ngrx/store';
import { getAllProduct, getAllProductFailure } from '../ngrx/product/product.action';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, MainCarouselComponent, CategoryComponent, ProductComponent]
})
export class HomeComponent implements OnInit {

  products: any[] = [];

  totalPages!: number;

  pageNo: number = 0;

  currentPage: number = 0;

  filter: ProductFilterRequest = {
    minPrice: 0,
    maxPrice: 0,
    categoryId: null,
    color: null,
    pageableDTO: {
      page: this.pageNo,
      size: 16,
      sort: [
        // {
        //   property: 'price',
        //   direction: 'ASC'
        // }
      ]
    }
  }

  constructor(private productService: ProductService, private store: Store<AppState>) {

    this.store.select(state => state.product.pageable).subscribe(
      pageable => {
        this.products = pageable?.content;
        this.totalPages = pageable?.totalPages
        this.currentPage = pageable?.number
      }
    )
  }

  ngOnInit() {
    this.store.dispatch(getAllProduct());

    this.getAllProduct(this.filter);

  }

  async getAllProduct(filter: ProductFilterRequest) {
    try {
      const action$ = this.productService.getAllProduct(filter);
      const action = await firstValueFrom(action$);
      this.store.dispatch(action);

    } catch (error) {
      console.log("error get all product pageable!", error);
      this.store.dispatch(getAllProductFailure({ error }));
    }
  }

  getRange(totalPages: number): number[] {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  async getPageNumber(pageNo: number) {
    this.filter.pageableDTO.page = pageNo - 1;
    try {
      const action$ = this.productService.getAllProduct(this.filter);
      const action = await firstValueFrom(action$);
      this.store.dispatch(action);

    } catch (error) {
      console.log("error get page number pageable!", error);
      this.store.dispatch(getAllProductFailure({ error }));
    }
  };


}
