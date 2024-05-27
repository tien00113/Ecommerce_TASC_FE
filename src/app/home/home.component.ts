import { Component, OnInit } from '@angular/core';
import { MainCarouselComponent } from './main-carousel/main-carousel.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from '../product/product.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule,MainCarouselComponent, CategoryComponent, ProductComponent]
})
export class HomeComponent implements OnInit {

  constructor() { }

  products: any[] = []; // Giả sử đây là mảng chứa các sản phẩm
  productRows: any[][] = [];

  ngOnInit(): void {
    // Giả sử products được khởi tạo với một số giá trị
    this.products = Array.from({ length: 12 }, (_, i) => ({ id: i, name: `Product ${i + 1}` }));

    // Chia products thành các hàng, mỗi hàng chứa tối đa 4 sản phẩm
    for (let i = 0; i < this.products.length; i += 4) {
      this.productRows.push(this.products.slice(i, i + 4));
    }
  }

}
