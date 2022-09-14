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

  //FILMES
  getFilmById(id: number){
      this.filmsService.filmsById(id)
      .then((data) => {
        this.film = data
        this.setInfo(this.film)
      })
      .catch((error)=> console.log(error))
    }

    setInfo(data: IFilm){
      this.host.title = data.title;
      this.host.director = `Director: ${data.director}`;
      this.host.releaseDate = `Release Date: ${data.release_date}`;
      this.host.body = data.opening_crawl;
    }
}
