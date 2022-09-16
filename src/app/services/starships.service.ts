import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATH } from 'src/environments/environment';
import { IStarships } from '../interfaces/IStarships';

@Injectable({
  providedIn: 'root'
})
export class StarshipsService {

constructor(private httpClient: HttpClient) { }

  getAllStarships(){
    return this.httpClient.get<IStarships[]>(`${API_PATH}/starships`).toPromise();
  }
  getStarshipById(id: number){
    return this.httpClient.get<IStarships>(`${API_PATH}/starships/${id}`).toPromise();
  }
}
