import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  standalone: true,
  styleUrls: ['./payment.component.css'],
  imports: [CommonModule]
})
export class PaymentComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  checkResult: any;

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        this.checkResult = params['paymentStatus'];
      }
    )
  }

  check(): Boolean{
    if (this.checkResult === "SUCCESS") {
      return true;
    }
    return false;
  }

  backToHome(){
    this.router.navigate(['/']);
  }

}
