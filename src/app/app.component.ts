import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductComponent } from './product/product.component';
import { HttpClientModule } from '@angular/common/http';

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
        })
      }
  }
}

