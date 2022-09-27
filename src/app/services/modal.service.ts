import { Injectable } from '@angular/core';
import { IFilm } from '../interfaces/IFilms';
import { IPeople } from '../interfaces/IPeople';
import { IPlanets } from '../interfaces/IPlanets';
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




  //FILMES
  getFilmById(id: number){
    this.filmsService.getFilmsById(id)
    .then((data) => {
      this.film = data
      this.setInfoFilms(this.film)
    })
    .catch((error)=> console.log(error))
  }

  setInfoFilms(data: IFilm){
    this.host.title = data.title;
    this.host.director = `Director: ${data.director}`;
    this.host.releaseDate = `Release Date: ${data.release_date}`;
    this.host.body = data.opening_crawl;
  }

  clearDataFilms(){
    this.host.title = '';
    this.host.director = '';
    this.host.releaseDate = '';
    this.host.body = '';
  }

  //PEOPLE
  getPeopleByUrl(url: string){
    this.peopleService.getPeopleByLink(url)
    .then((data) => {
      this.people = data
      this.setInfoPeople(this.people)
    })
    .catch((error)=> console.log(error))
  }

  getPeopleFIlmsList(films: string[]): string []{

    console.log(films)
    for(let i = 0; i < films.length; i++){
      this.filmsService.getFilmsByUrl(films[i])
      .then((data) => {films[i] = (data.title)})

    }
    return films
  }

  setInfoPeople(data: IPeople){
    this.host.title = data.name;
    this.host.gender = data.gender;
    this.host.height = data.height;
    this.host.hairColor = data.hair_color
    this.host.mass = data.mass
    this.host.peopleFilms = this.getPeopleFIlmsList(data.films)
    this.planetsService.getPlanetByUrl(data.homeworld)
    .then((data) => {this.host.homeworld = data.name});



  }

  clearDataPeople(){
    this.host.title = '';
    this.host.director = '';
    this.host.releaseDate = '';
    this.host.body = '';
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
    // this.host.name = data.name;
    // this.host.gender = data.gender;
    // this.host.height = data.height;
    // this.host.homeworld = '';
  }
  clearDataPlanets(){
    this.host.title = '';
    this.host.director = '';
    this.host.releaseDate = '';
    this.host.body = '';
  }
}
