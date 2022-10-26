import { Injectable } from '@angular/core';
import { IFilm } from '../interfaces/IFilms';
import { IPeople } from '../interfaces/IPeople';
import { IPlanets } from '../interfaces/IPlanets';
import { ISpecies } from '../interfaces/ISpecies';
import { IStarships } from '../interfaces/IStarships';
import { IVehicles } from '../interfaces/IVehicles';
import { ModalComponent } from '../modal/modal.component';
import { FilmsService } from './films.service';
import { PeopleService } from './people.service';
import { PlanetsService } from './planets.service';
import { SpeciesService } from './species.service';
import { StarshipsService } from './starships.service';
import { VehiclesService } from './vehicles.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  host!: ModalComponent;

  film: any;
  people: any;
  starships: any;
  planets: any;
  vehicles: any;
  species: any;


  constructor(private filmsService: FilmsService,
              private peopleService: PeopleService,
              private speciesService: SpeciesService,
              private planetsService: PlanetsService,
              private vehiclesService: VehiclesService,
              private starshipsService: StarshipsService){}


  clearData(){
    this.host.title = '';
  }

  //FILMES
  getFilmById(id: number){
    this.filmsService.getFilmsById(id)
    .then((data) => {
      this.film = data
      this.setInfoFilms(this.film)
    })
    .catch((error)=> console.log(error))
  }

  getFilmsList(films: string[]): string []{
    for(let i = 0; i < films.length; i++){
      this.filmsService.getFilmsByUrl(films[i])
      .then((data) => {films[i] = (data.title)})

    }
    return films
  }

  setInfoFilms(data: IFilm){
    this.host.title = data.title;
    this.host.film = data;
  }

  //PEOPLE
  getPeopleByUrl(url: string){
    this.peopleService.getPeopleByUrl(url)
    .then((data) => {
      this.people = data
      this.setInfoPeople(this.people)
    })
    .catch((error)=> console.log(error))
  }

  getPeopleList(people: string[]): string []{
    for(let i = 0; i < people.length; i++){
      this.peopleService.getPeopleByUrl(people[i])
      .then((data) => {people[i] = (data.name)})

    }
    return people
  }

  setInfoPeople(data: IPeople){
    this.host.people = data;
    this.host.peopleFilms = this.getFilmsList(data.films);
    this.planetsService.getPlanetByUrl(data.homeworld)
    .then((data) => {this.host.homeworld = data.name});
    this.peopleService.getPeopleImageById(data.url.split('/')[5])
    .then((result) => {this.host.image_url = result.image,
    this.host.title = data.name});
  }

  //PLANETS
  getPlanetByUrl(url: string){
    this.planetsService.getPlanetByUrl(url)
      .then((data) => {
        this.planets = data
        this.setInfoPlanets(this.planets)
      })
      .catch((error)=> console.log(error))
    }

  setInfoPlanets(data: IPlanets){
    this.host.title = data.name;
    this.host.planet = data;
    this.host.residents = this.getPeopleList(data.residents);
    this.host.planetFilms = this.getFilmsList(data.films);
  }

  //Vehicles
  getVehicleByUrl(url: string){
    this.vehiclesService.getVehicleByUrl(url)
      .then((data) => {
        this.vehicles = data
        this.setInfoVehicles(this.vehicles)
      })
      .catch((error)=> console.log(error))
  }

  setInfoVehicles(data: IVehicles){
    this.host.title = data.name;
    this.host.vehicle = data;
    this.host.vehicleFilms = this.getFilmsList(data.films);
    this.host.vehiclePilots = this.getPeopleList(data.pilots)
  }

  //Species
  getSpecieByUrl(url: string){
    this.planetsService.getPlanetByUrl(url)
      .then((data) => {
        this.species = data
        this.setInfoSpecies(this.species)
      })
      .catch((error)=> console.log(error))
  }

  setInfoSpecies(data: ISpecies){
    this.host.title = data.name;
    this.host.specie = data;
    this.host.specieFilms = this.getFilmsList(data.films);
    this.host.speciePeople = this.getPeopleList(data.people);
    this.planetsService.getPlanetByUrl(data.homeworld)
    .then((data) => {this.host.homeworld = data.name});

  }

  //Starships
  getStarshipsByUrl(url: string){
    this.starshipsService.getStarshipByUrl(url)
      .then((data) => {
        this.starships = data;
        this.setInfoStarships(this.starships);
      })
      .catch((error)=> console.log(error));
  }

  setInfoStarships(data: IStarships){
    this.host.title = data.name;
    this.host.starships = data;
    this.host.starshipsFilms = this.getFilmsList(data.films);
    this.host.starshipsPilots = this.getPeopleList(data.pilots);
  }
}
