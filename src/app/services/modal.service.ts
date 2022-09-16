import { Injectable } from '@angular/core';
import { IFilm } from '../interfaces/IFilms';
import { ModalComponent } from '../modal/modal.component';
import { FilmsService } from './films.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  host!: ModalComponent;

  film: any;

  constructor(private filmsService: FilmsService){

  }
  clearData(){
    console.log('Limpou saporra');
    this.host.title = '';
    this.host.director = '';
    this.host.releaseDate = '';
    this.host.body = '';
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

    setInfoFilms(data: IFilm){
      this.host.title = data.title;
      this.host.director = `Director: ${data.director}`;
      this.host.releaseDate = `Release Date: ${data.release_date}`;
      this.host.body = data.opening_crawl;
    }
}
