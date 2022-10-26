import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as bootstrap from 'bootstrap';

import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit{
  constructor(private modalService: ModalService,
              private router: ActivatedRoute)
  {
    this.id = router.snapshot.params.id;  
  }

  public id?: number;

  ngOnInit(): void {
    if(this.id){
      document.getElementById(`filme-${this.id}`)?.click();
    }
  }

  setId(id: number){
    this.id = id;
    this.modalService.getFilmById(this.id)
  }
}
