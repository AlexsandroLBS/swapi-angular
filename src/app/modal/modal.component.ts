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
  @Input() image_url: string = '';
  @Input() title: string = '';
  @Input() PeopleIds: number[] = [];
  @Input() FilmsIds: number[] = [];

  //FILM
  @Input() film: any = [];
  @Input() filmPeople: { id: string; data: string; }[] = [];
  @Input() filmStarships: { id: string; data: string; }[] = [];
  @Input() filmSpecies: { id: string; data: string; }[] = [];
  @Input() filmVehicles: { id: string; data: string; }[] = [];
  @Input() filmPlanets: { id: string; data: string; }[] = [];

  //People
  @Input() people: any = [];
  @Input() homeworld: string = '';
  @Input() peopleFilms: { id: string; data: string; }[] = [];
  @Input() peopleStarships: { id: string; data: string; }[] = [];
  @Input() peopleSpecies: { id: string; data: string; }[] = [];
  @Input() peopleVehicles: { id: string; data: string; }[] = [];
  @Input() peoplePlanets: { id: string; data: string; }[] = [];


  //Planet
  @Input() planet: any = [];
  @Input() planetPeople: { id: string; data: string; }[] = [];
  @Input() planetFilms: { id: string; data: string; }[] = [];

  //Vehicles
  @Input() vehicle: any = [];
  @Input() vehicleFilms: { id: string; data: string; }[] = [];
  @Input() vehiclePilots: { id: string; data: string; }[] = [];

  //Species
  @Input() specie: any = [];
  @Input() specieFilms: { id: string; data: string; }[] = [];
  @Input() speciePeople: { id: string; data: string; }[] = [];

  //Starships
   @Input() starships: any = [];
   @Input() starshipsFilms: { id: string; data: string; }[] = [];
   @Input() starshipsPilots: { id: string; data: string; }[] = [];



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
