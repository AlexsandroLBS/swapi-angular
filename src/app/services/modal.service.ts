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

  getFilmsList(films: string[]){
    let filmsList: { id: string; data: string; }[] = []
    for(let i = 0; i < films.length; i++){
      this.filmsService.getFilmsByUrl(films[i])
      .then((data) => {
        let film = {
          id: films[i].split('/')[5], 
          data: data.title
      }
        filmsList.push(film)   
      })

    }
    return filmsList
  }

  setInfoFilms(data: IFilm){
    this.host.title = data.title;
    this.host.film = data;

    this.host.filmPeople = this.getPeopleList(data.characters)
    this.host.filmPlanets = this.getPlanetList(data.planets)
    this.host.filmStarships = this.getStarshipsList(data.starships)
    this.host.filmVehicles = this.getVehiclesList(data.vehicles)
    this.host.filmSpecies = this.getSpeciesList(data.species)
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

  getPeopleById(id: number){
    this.peopleService.getPeopleById(id)
    .then((data) => {
      this.people = data
      this.setInfoPeople(this.people)
    })
    .catch((error)=> console.log(error))
  }

  getPeopleList(people: string[]): {id: string; data: string;}[]{
    let peopleList: { id: string; data: string; }[] = []
    for(let i = 0; i < people.length; i++){
      this.peopleService.getPeopleByUrl(people[i])
      .then((data) => {
        let peopleData = {
          id: people[i].split('/')[5], 
          data: data.name
      }
        peopleList.push(peopleData)   
      })
    }
    return peopleList
  }


  setInfoPeople(data: IPeople){
    this.host.people = data;
    this.host.peopleFilms = this.getFilmsList(data.films);
    this.host.peopleSpecies = this.getSpeciesList(data.species);
    this.host.peopleStarships = this.getStarshipsList(data.starships);
    this.host.peopleVehicles = this.getVehiclesList(data.vehicles);
    
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

  getPlanetById(id: number){
    this.planetsService.getPlanetById(id)
      .then((data) => {
        this.planets = data
        this.setInfoPlanets(this.planets)
      })
      .catch((error)=> console.log(error))
    }

  getPlanetList(planet: string[]): {id: string; data: string;}[]{
    let planetList: { id: string; data: string; }[] = []
    for(let i = 0; i < planet.length; i++){
      this.planetsService.getPlanetByUrl(planet[i])
      .then((data) => {
        let planetData = {
          id: planet[i].split('/')[5], 
          data: data.name
      }
        planetList.push(planetData)   
      })
    }
    return planetList
  }

  setInfoPlanets(data: IPlanets){
    this.host.title = data.name;
    this.host.planet = data;
    
    this.host.planetPeople = this.getPeopleList(data.residents);
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

  getVehicleById(id: number){
    this.vehiclesService.getVehicleById(id)
      .then((data) => {
        this.vehicles = data
        this.setInfoVehicles(this.vehicles)
      })
      .catch((error)=> console.log(error))
  }
  
  getVehiclesList(vehicles: string[]): {id: string; data: string;}[]{
    let vehiclesList: { id: string; data: string; }[] = []
    for(let i = 0; i < vehicles.length; i++){
      this.vehiclesService.getVehicleByUrl(vehicles[i])
      .then((data) => {
        let vehiclesData = {
          id: vehicles[i].split('/')[5], 
          data: data.name
      }
        vehiclesList.push(vehiclesData)   
      })
    }
    return vehiclesList
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

  getSpecieById(id: number){
    this.planetsService.getPlanetById(id)
      .then((data) => {
        this.species = data
        this.setInfoSpecies(this.species)
      })
      .catch((error)=> console.log(error))
  }

  getSpeciesList(species: string[]): {id: string; data: string;}[]{
    let speciesList: { id: string; data: string; }[] = []
    for(let i = 0; i < species.length; i++){
      this.speciesService.getSpecieByUrl(species[i])
      .then((data) => {
        let speciesData = {
          id: species[i].split('/')[5], 
          data: data.name
      }
        speciesList.push(speciesData)   
      })
    }
    return speciesList
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

  getStarshipsById(id: number){
    this.starshipsService.getStarshipById(id)
      .then((data) => {
        this.starships = data;
        this.setInfoStarships(this.starships);
      })
      .catch((error)=> console.log(error));
  }

  getStarshipsList(starships: string[]): {id: string; data: string;}[]{
    let starshipsList: { id: string; data: string; }[] = []
    for(let i = 0; i < starships.length; i++){
      this.starshipsService.getStarshipByUrl(starships[i])
      .then((data) => {
        let starshipsData = {
          id: starships[i].split('/')[5], 
          data: data.name
      }
        starshipsList.push(starshipsData)   
      })
    }
    return starshipsList
  }

  setInfoStarships(data: IStarships){
    this.host.title = data.name;
    this.host.starships = data;
    this.host.starshipsFilms = this.getFilmsList(data.films);
    this.host.starshipsPilots = this.getPeopleList(data.pilots);
  }
}
