import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ModalComponent } from './modal/modal.component';
import { CurrencyFormatPipe } from '../currency-format.pipe';
import { ProductFilterRequest } from '../models/ProductFilterRequest';
import { ProductService } from '../ngrx/product/product.service';
import { firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../models/AppState';
import { getProductDetail, getProductDetailFailure } from '../ngrx/product/product.action';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, CurrencyFormatPipe]
})
export class ProductComponent implements OnInit {

  @ViewChild(ModalComponent) modalComponent!: ModalComponent;

  constructor(private router: Router,
  ) { 
  }

  ngOnInit() {

  }

  modalOpen: boolean = false;

  productDetail( productId: number) {
    this.router.navigate(['/product', productId]);
  }

  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  @Input() product: any;


}
