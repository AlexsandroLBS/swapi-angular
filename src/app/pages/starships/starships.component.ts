import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IStarships } from 'src/app/interfaces/IStarships';
import { ModalService } from 'src/app/services/modal.service';
import { StarshipsService } from 'src/app/services/starships.service';

@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.css']
})
export class StarshipsComponent implements OnInit {

  constructor(private modalService: ModalService,
              private starshipsService: StarshipsService,
              private router: ActivatedRoute) {
  this.id = router.snapshot.params.id;
  }
  public id?: number;

  public _filtroLista: string = '';
  public data: any = [];
  public starships: any = [];
  public filteredStarships: IStarships[] = [];

  public next_page: any ;
  public previous_page: any;

  public get filtroLista(){
  return this._filtroLista;
  }

  public set filtroLista(value : string){
  this._filtroLista = value;
  this.filteredStarships= this.filtroLista ? this.filtrarStarships(this.filtroLista) : this.starships;
  }

  ngOnInit() {
    this.initTable();
    if(this.id){
      this.getStarshipsById(this.id) 
      document.getElementById(`hiddenOffcanvasButton`)?.click(); 
    }
  }

  initTable(){
    this.loadData()
    .subscribe((response) => {
      this.data = response,
      this.next_page = this.data.next,
      this.previous_page = this.data.previous,
      this.starships = this.data.results,
      this.filteredStarships = this.data.results},
      error => console.log(error));
    }

  loadData(): Observable<IStarships[]>{
    return this.starshipsService.getAllStarships()
  }

  getStarshipsByUrl(url: string){
    this.modalService.getStarshipsByUrl(url)
  }

  getStarshipsById(id: number){
    this.modalService.getStarshipsById(id)
    
  }

  filtrarStarships(filtro : string) : any{
    filtro = filtro.toLowerCase();
    return this.filteredStarships.filter(
      (people : { name:string; url:string })=> people.name.toLocaleLowerCase().indexOf(filtro)!== -1
    );
  }

  changePage(url: string){
    this.starshipsService.getStarshipsListByUrl(url)
    .subscribe((response) => {
      this.data = response,
      this.next_page = this.data.next,
      this.previous_page = this.data.previous,
      this.starships = this.data.results,
      this.filteredStarships = this.data.results},
      error => console.log(error));
  }
}
