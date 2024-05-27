import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { routes } from './app.routes';
import { HomeComponent } from './home/home.component';
import { initFlowbite } from 'flowbite';
import { isPlatformBrowser } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, NavbarComponent]
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

