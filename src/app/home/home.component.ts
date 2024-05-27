import { Component, OnInit } from '@angular/core';
import { MainCarouselComponent } from './main-carousel/main-carousel.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from '../product/product.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule,MainCarouselComponent, CategoryComponent, ProductComponent]
})
export class HomeComponent implements OnInit {

  products: any[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    const params = {
      page: 0,
      color: ''
    };
    this.getAllProduct(params);
  }

  getAllProduct(params: { page: number, color: string }) {
    this.productService.getAllProduct(params).subscribe(res => {
      this.products = res.content;
    });
  }

}
