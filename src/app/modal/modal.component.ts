import { Component, Input, OnInit } from '@angular/core';
import { IFilm } from '../interfaces/IFilms';
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
  @Input() film: any = [];

  //People
  @Input() people: any = [];

  @Input() homeworld: string = '';
  @Input() peopleFilms: string[] = [];
  @Input() image_url: string = '';
  
  //Planet
  @Input() planet: any = [];
  @Input() residents: string[] = [];
  @Input() filmsList: string[] = [];





  ngOnInit() {
    const myOffcanvasFilms = document.getElementById('offcanvasRightFilms') as any
    myOffcanvasFilms.addEventListener('hide.bs.offcanvas', () => {
      this.modalService.clearData();
    })
    const myOffcanvasPeople = document.getElementById('offcanvasRightPeople') as any
    myOffcanvasPeople.addEventListener('hide.bs.offcanvas', () => {
      this.modalService.clearData();
    })
    const myOffcanvasStarships = document.getElementById('offcanvasRightStarships') as any
    myOffcanvasStarships.addEventListener('hide.bs.offcanvas', () => {
      this.modalService.clearData();
    })
    const myOffcanvasVehicles = document.getElementById('offcanvasRightVehicles') as any
    myOffcanvasVehicles.addEventListener('hide.bs.offcanvas', () => {
      this.modalService.clearData();
    })
    const myOffcanvasSpecies = document.getElementById('offcanvasRightSpecies') as any
    myOffcanvasSpecies.addEventListener('hide.bs.offcanvas', () => {
      this.modalService.clearData();
    })
    const myOffcanvasPlanets = document.getElementById('offcanvasRightPlanets') as any
    myOffcanvasPlanets.addEventListener('hide.bs.offcanvas', () => {
      this.modalService.clearData();
    })

  }
}
