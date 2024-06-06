import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: []
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  // ngOnChanges(changes: SimpleChanges): void {
  //   //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
  //   //Add '${implements OnChanges}' to the class.
    
  // }

  ngOnInit() {

  }

  navigateToCart() {
    this.router.navigate(['/cart']);
  }

  show: Boolean = false;

  showFilter() {
    this.show = true;
  }

  closeFilter() {
    this.show = false;
  }

}
