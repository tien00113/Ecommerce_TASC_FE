import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule]
})
export class ProductComponent implements OnInit {

  constructor(private router: Router, private productService: ProductService) { }

  products: any[] = [];

  ngOnInit() {
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

  productDetail(productId: number) {
    this.router.navigate(['/product', productId]);
  }

  @Input() product: any;

}
