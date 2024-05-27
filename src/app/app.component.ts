import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { routes } from './app.routes';
import { HomeComponent } from './home/home.component';
import { initFlowbite } from 'flowbite';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductComponent } from './product/product.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [CommonModule,RouterOutlet, HomeComponent, NavbarComponent, ProductComponent, FooterComponent]
})
export class AppComponent implements OnInit{
  title = 'Ecommerce_Tasc_FE';

  constructor(@Inject(PLATFORM_ID) private platformId: any){}

  ngOnInit(): void {
      if (isPlatformBrowser(this.platformId)) {
        import('flowbite').then(module => {
          const { initAccordions, initFlowbite } = module;
          initAccordions();
          initFlowbite();
        });
      }
  }
}

