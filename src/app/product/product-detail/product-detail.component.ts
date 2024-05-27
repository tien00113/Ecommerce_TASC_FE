import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface Image {
  url: string;
  selected: boolean;
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ProductDetailComponent implements OnInit {

  colors: string[] = ['Đen', 'Trắng', 'Xám', 'Xanh'];
  sizes: string[] = ['S', 'M', 'L', 'XL'];
  images: Image[] = [
    { url: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg', selected: false },
    { url: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg', selected: false },
    { url: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg', selected: false },
    { url: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg', selected: false },
    { url: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg', selected: false }
  ];
  selectedImage: string = this.images[0].url;
  selectedColor: string = '';
  selectedSize: string = '';

  constructor() { 
    // this.images[0].selected = true;
  }

  ngOnInit() {
    console.log(this.images)
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
