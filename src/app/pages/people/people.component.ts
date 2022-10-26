import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IPeople } from 'src/app/interfaces/IPeople';
import { ModalService } from 'src/app/services/modal.service';
import { PeopleService } from 'src/app/services/people.service';
import { PlanetsService } from 'src/app/services/planets.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  constructor(private peopleService: PeopleService,
              private modalService: ModalService,
              private planetsService: PlanetsService,
              private router: ActivatedRoute) {
  this.id = router.snapshot.params.id;         
              }
  
  public id?: number;            
  public _filtroLista: string = '';
  public data: any = [];
  public people: any = [];
  public filteredPeople: IPeople[] = [];

  public next_page: any ;
  public previous_page: any;

  public get filtroLista(){
    return this._filtroLista;
  }

  public set filtroLista(value : string){
    this._filtroLista = value;
    this.filteredPeople= this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.people;
  }

  ngOnInit() {
    this.initTable();
    if(this.id){
      this.getPeopleById(this.id) 
      document.getElementById(`hiddenOffcanvasButton`)?.click(); 
    }
  }

  initTable(){
    this.loadData()
    .subscribe((response) => {
      this.data = response,
      this.next_page = this.data.next,
      this.previous_page = this.data.previous,
      this.people = this.data.results,
      this.filteredPeople = this.data.results},
      error => console.log(error));
    }

  loadData(): Observable<IPeople[]>{
    return this.peopleService.getAllPeoples()
  }

  filtrarEventos(filtro : string) : any{
    filtro = filtro.toLowerCase();
    return this.filteredPeople.filter(
      (people : { name:string; url:string })=> people.name.toLocaleLowerCase().indexOf(filtro)!== -1
    );
  }

  getPeopleByUrl(url: string){
    this.modalService.getPeopleByUrl(url)
  }

  getPeopleById(id: number){
    this.modalService.getPeopleById(id)
  }

  changePage(url: string){
    this.peopleService.getPeopleListByUrl(url)
    .subscribe((response) => {
      this.data = response,
      this.next_page = this.data.next,
      this.previous_page = this.data.previous,
      this.people = this.data.results,
      this.filteredPeople = this.data.results},
      error => console.log(error));
    }

  }
