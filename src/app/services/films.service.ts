import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATH } from 'src/environments/environment';
import { IFilm } from '../interfaces/IFilms';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  constructor(private httpClient: HttpClient) { }

  allFilms(){
    return this.httpClient.get<IFilm[]>(`${API_PATH}/films`).toPromise();
  }

  filmsById(id: number){
     return this.httpClient.get<IFilm>(`${API_PATH}/films/${id}`).toPromise();
  }
}
