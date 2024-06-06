import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  modalOpen: boolean = false;

  openModal() {
    this.modalOpen = true;
    console.log("đã gọi");
  }

  closeModal() {
    this.modalOpen = false;
  }

}
