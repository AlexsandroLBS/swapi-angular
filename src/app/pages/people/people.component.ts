import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPeople } from 'src/app/interfaces/IPeople';
import { ModalService } from 'src/app/services/modal.service';
import { PeopleService } from 'src/app/services/people.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  constructor(private peopleService: PeopleService,
              private modalService: ModalService) {}

  public _filtroLista: string = '';
  public data: any = [];
  public people: any = [];
  public filteredPeople: IPeople[] = [];

  public get filtroLista(){
    return this._filtroLista;
  }

  public set filtroLista(value : string){
    this._filtroLista = value;
    this.filteredPeople= this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.people;
  }

  ngOnInit() {
    this.initTable();
  }

  initTable(){
    this.loadData()
    .subscribe((response) => {this.data = response,
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
      (people : { name:string; url:string })=> people.name.toLocaleLowerCase().indexOf(filtro)!== -1 ||
      people.url.toLocaleLowerCase().indexOf(filtro)!== -1
    );
  }

  getPeopleByUrl(url: string){
      this.modalService.getPeopleByUrl(url)
  }
}
