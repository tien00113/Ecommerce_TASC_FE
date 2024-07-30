import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../models/AppState';
import { ProductFilterRequest } from '../models/ProductFilterRequest';
import { getAllProduct } from '../ngrx/product/product.action';
import { ProductComponent } from '../product/product.component';
import { CategoryComponent } from './category/category.component';
import { MainCarouselComponent } from './main-carousel/main-carousel.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MainCarouselComponent,
    CategoryComponent,
    ProductComponent,
  ],
})
export class HomeComponent implements OnInit {
  products: any[] = [];

  totalPages!: number;

  pageNo: number = 0;

  currentPage: number = 0;

  filter: ProductFilterRequest = {
    pageableDTO: {
      page: 0,
      size: 16,
      sortProperty: 'id',
      sortDirection: 'ASC',
    },
  };

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.store
      .select((state) => state.product.pageable)
      .subscribe((pageable) => {
        this.products = pageable?.content;
        this.totalPages = pageable?.totalPages;
        this.currentPage = pageable?.number;
      });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.filter = {
        minPrice: params['minPrice'] ? +params['minPrice'] : undefined,
        maxPrice: params['maxPrice'] ? +params['maxPrice'] : undefined,
        categoryId: params['categoryId'] ? +params['categoryId'] : undefined,
        color: params['color'],
        pageableDTO: {
          page: params['page'] ? +params['page'] - 1 : 0,
          size: params['size'] ? +params['size'] : 16,
          sortProperty: params['sortProperty'] || 'id',
          sortDirection: params['sortDirection'] || 'ASC',
        },
      };
      this.store.dispatch(getAllProduct({ filter: this.filter }));
    });
  }

  getRange(totalPages: number): number[] {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  onPageChange(page: number): void {
    const updatedPageableDTO = { ...this.filter.pageableDTO, page: page - 1 };
    this.filter = { ...this.filter, pageableDTO: updatedPageableDTO };
    this.updateUrlWithQueryParams();
  }
  

  onNextPage(): void {
    if (this.currentPage + 1 < this.totalPages) {
      const updatedPageableDTO = {
        ...this.filter.pageableDTO,
        page: this.currentPage + 1,
      };
      this.filter = { ...this.filter, pageableDTO: updatedPageableDTO };

      this.updateUrlWithQueryParams();
    }
  }

  onPreviousPage(): void {
    if (this.currentPage > 0) {
      const updatedPageableDTO = { ...this.filter.pageableDTO, page: this.currentPage - 1 };
      this.filter = { ...this.filter, pageableDTO: updatedPageableDTO };
  
      this.updateUrlWithQueryParams();
    }
  }
  

  updateUrlWithQueryParams(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        ...this.filter,
        page: this.filter.pageableDTO.page + 1, // Convert to one-based index for user display
        size: this.filter.pageableDTO.size,
        sortProperty: this.filter.pageableDTO.sortProperty,
        sortDirection: this.filter.pageableDTO.sortDirection,
      },
      queryParamsHandling: 'merge', // Merge with existing query params
    });
  }
}
