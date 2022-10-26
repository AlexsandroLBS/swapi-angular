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
    return this.httpClient.get<IStarships[]>(`${API_PATH}/starships`);
  }

  getStarshipById(id: number){
    return this.httpClient.get<IStarships>(`${API_PATH}/starships/${id}`).toPromise();
  }

  getStarshipByUrl(url: string){
    return this.httpClient.get<IStarships>(`${url}`).toPromise();
  }

  getStarshipsListByUrl(url: string){
    return this.httpClient.get<IStarships[]>(`${url}`);
  }
}
