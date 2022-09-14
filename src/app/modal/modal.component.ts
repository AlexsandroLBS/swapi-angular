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
  @Input() title: string = "";
  @Input() body: string = "";
  @Input() director: string = "";
  @Input() releaseDate: string = "";

  ngOnInit() {
  }

}
