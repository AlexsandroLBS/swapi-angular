import { Component, OnInit} from '@angular/core';
import * as bootstrap from 'bootstrap';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit{
  constructor(private modalService: ModalService)
  {}

  id?: number;

  ngOnInit(): void {
  }

  setId(id: number){
    this.id = id;
    this.modalService.getFilmById(this.id)
  }
}
