import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ISpecies } from 'src/app/interfaces/ISpecies';
import { ModalService } from 'src/app/services/modal.service';
import { SpeciesService } from 'src/app/services/species.service';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.css']
})
export class SpeciesComponent implements OnInit {

  constructor(private modalService: ModalService,
              private speciesService: SpeciesService,
              private router: ActivatedRoute) {
      this.id = router.snapshot.params.id;
    }
  public id?: number;
  
  public _filtroLista: string = '';
  public data: any = [];
  public species: any = [];
  public filteredSpecies: ISpecies[] = [];

  public next_page: any ;
  public previous_page: any;

  public get filtroLista(){
  return this._filtroLista;
  }

  public set filtroLista(value : string){
    this._filtroLista = value;
    this.filteredSpecies= this.filtroLista ? this.filtrarSpecies(this.filtroLista) : this.species;
  }

  ngOnInit() {
    this.initTable();
    if(this.id){
      this.getSpecieById(this.id) 
      document.getElementById(`hiddenOffcanvasButton`)?.click();     
    }
  }

  initTable(){
    this.loadData()
    .subscribe((response) => {
      this.data = response,
      this.next_page = this.data.next,
      this.previous_page = this.data.previous,
      this.species = this.data.results,
      this.filteredSpecies = this.data.results},
      error => console.log(error));
  }

  loadData(): Observable<ISpecies[]>{
    return this.speciesService.getAllSpecies()
  }

  getSpecieByUrl(url: string){
    this.modalService.getSpecieByUrl(url)
  }

  getSpecieById(id: number){
    this.modalService.getSpecieById(id)
  }

  filtrarSpecies(filtro : string) : any{
    filtro = filtro.toLowerCase();
    return this.filteredSpecies.filter(
      (people : { name:string; url:string })=> people.name.toLocaleLowerCase().indexOf(filtro)!== -1
      );
  }

  changePage(url: string){
    this.speciesService.getSpeciesListByUrl(url)
    .subscribe((response) => {
      this.data = response,
      this.next_page = this.data.next,
      this.previous_page = this.data.previous,
      this.species = this.data.results,
      this.filteredSpecies = this.data.results},
      error => console.log(error));
  }

}
