import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { FilmsService } from '../films.service';
import { IFilm } from '../IFilms';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit{
  constructor(private filmsService: FilmsService)
  {}

  listaFilms: any = [];
  film: any;
  title: string = "";
  body: string = "";

  ngOnInit(): void {
    let myOffcanvas = document.getElementById("offcanvasRight")!;
    let bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas);
  }

  async getFilmById(id: number){
    await this.filmsService.filmsById(id)
    .then((data) =>  this.getFilms(data))
    .catch((error)=> console.log(error))  }

  getFilms(data: IFilm){
    this.film = data;
  }

  setInfo(id: number){
    this.getFilmById(id)
    this.title = this.film.title
    this.body = this.film.opening_crawl
  }
}
