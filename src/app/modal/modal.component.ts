import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor( private modalService: ModalService) {
    this.modalService.host = this;
   }

  @Input() title: string = '';

  //FILM
  @Input() body: string = '';
  @Input() director: string = '';
  @Input() releaseDate: string = '';

  //People
  @Input() gender: string = '';
  @Input() height: string = '';
  @Input() homeworld: string = '';
  @Input() hairColor: string = '';


  ngOnInit() {
    const myOffcanvas = document.getElementById('offcanvasRightFilms') as any
    myOffcanvas.addEventListener('hide.bs.offcanvas', () => {
      this.modalService.clearData()
})
  }
}
