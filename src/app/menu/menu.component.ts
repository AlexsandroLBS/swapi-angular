import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public filmes: any = [];
  public filmesFiltrados: any = [];

  widthImg: number = 150;
  marginImg: number = 2;
  mostrarImagem: boolean = true;

  private _filtroLista : string = ''


  public get filtroLista(){
    return this._filtroLista;
  }

  public set filtroLista(value : string){
    this._filtroLista = value;
    this.filmesFiltrados = this.filtroLista ? this.filtrarFilmes(this.filtroLista) : this.filmes;
  }

  public filtrarFilmes(filtro : string) : any{
    filtro = filtro.toLowerCase();
    return this.filmes.filter(
      (filmes : {tema:string; local:string })=> filmes.tema.toLocaleLowerCase().indexOf(filtro)!== -1 ||
      filmes.local.toLocaleLowerCase().indexOf(filtro)!== -1
    );
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getFilmes();

  }

  alterarImagem(){
    this.mostrarImagem  = !this.mostrarImagem;
  }

  public getFilmes() : void {
    this.http.get('https://swapi.dev/api/films').subscribe(
      response => {this.filmes = response,
      this.filmesFiltrados = this.filmes},
      error => console.log(error),
    );
  }
}
