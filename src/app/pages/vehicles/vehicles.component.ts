import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IVehicles } from 'src/app/interfaces/IVehicles';
import { ModalService } from 'src/app/services/modal.service';
import { VehiclesService } from 'src/app/services/vehicles.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  constructor(private modalService: ModalService,
              private vehiclesService: VehiclesService,
              private router: ActivatedRoute) {
  this.id = router.snapshot.params.id;
  }

  public id?: number;
  public _filtroLista: string = '';
  public data: any = [];
  public vehicles: any = [];
  public filteredVehicles: IVehicles[] = [];

  public next_page: any ;
  public previous_page: any;

  public get filtroLista(){
    return this._filtroLista;
  }

  public set filtroLista(value : string){
    this._filtroLista = value;
    this.filteredVehicles= this.filtroLista ? this.filtrarVehicles(this.filtroLista) : this.vehicles;
  }

  ngOnInit() {
  this.initTable();
  if(this.id){
    this.getVehicleById(this.id) 
    document.getElementById(`hiddenOffcanvasButton`)?.click(); 
  }
  }

  initTable(){
    this.loadData()
    .subscribe((response) => {
      this.data = response,
      this.next_page = this.data.next,
      this.previous_page = this.data.previous,
      this.vehicles = this.data.results,
      this.filteredVehicles = this.data.results},
      error => console.log(error));
  }

  loadData(): Observable<IVehicles[]>{
    return this.vehiclesService.getAllVehicles()
  }

  getVehicleByUrl(url: string){
  this.modalService.getVehicleByUrl(url)
  }
  
  getVehicleById(id: number){
  this.modalService.getVehicleById(id)
  }

  filtrarVehicles(filtro : string) : any{
    filtro = filtro.toLowerCase();
    return this.filteredVehicles.filter(
      (people : { name:string; url:string })=> people.name.toLocaleLowerCase().indexOf(filtro)!== -1
      );
  }

  changePage(url: string){
    this.vehiclesService.getVehiclesListByUrl(url)
    .subscribe((response) => {
        this.data = response,
        this.next_page = this.data.next,
        this.previous_page = this.data.previous,
        this.vehicles = this.data.results,
        this.filteredVehicles = this.data.results},
        error => console.log(error));
  }

}
