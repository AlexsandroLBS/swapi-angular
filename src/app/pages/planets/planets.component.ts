import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IPlanets } from 'src/app/interfaces/IPlanets';
import { ModalService } from 'src/app/services/modal.service';
import { PlanetsService } from 'src/app/services/planets.service';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css']
})
export class PlanetsComponent implements OnInit {

  constructor(private modalService: ModalService,
              private planetsService: PlanetsService,
              private router: ActivatedRoute) {
  this.id = router.snapshot.params.id;
}
  
  public id?: number;
  public _filtroLista: string = '';
  public data: any = [];
  public planets: any = [];
  public filteredPlanets: IPlanets[] = [];

  public next_page: any ;
  public previous_page: any;

  public get filtroLista(){
  return this._filtroLista;
  }

  public set filtroLista(value : string){
  this._filtroLista = value;
  this.filteredPlanets= this.filtroLista ? this.filtrarPlanets(this.filtroLista) : this.planets;
  }

  ngOnInit() {
    this.initTable();
    if(this.id){
      this.getPlanetById(this.id) 
      document.getElementById(`hiddenOffcanvasButton`)?.click(); 
    }
  }

  initTable(){
    this.loadData()
    .subscribe((response) => {
      this.data = response,
      this.next_page = this.data.next,
      this.previous_page = this.data.previous,
      this.planets = this.data.results,
      this.filteredPlanets = this.data.results},
      error => console.log(error));
  }

  loadData(): Observable<IPlanets[]>{
  return this.planetsService.getAllPlanets()
  }

  filtrarPlanets(filtro : string) : any{
    filtro = filtro.toLowerCase();
    return this.filteredPlanets.filter(
    (people : { name:string; url:string })=> people.name.toLocaleLowerCase().indexOf(filtro)!== -1
    );
  }

  getPlanetByUrl(url: string){
    this.modalService.getPlanetByUrl(url)
  }

  getPlanetById(id: number){
    this.modalService.getPlanetById(id)
  }

  changePage(url: string){
    this.planetsService.getPlanetsListByUrl(url)
    .subscribe((response) => {
      this.data = response,
      this.next_page = this.data.next,
      this.previous_page = this.data.previous,
      this.planets = this.data.results,
      this.filteredPlanets = this.data.results},
      error => console.log(error));
    }

}
