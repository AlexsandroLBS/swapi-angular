import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATH } from 'src/environments/environment';
import { IPlanets } from '../interfaces/IPlanets';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {

constructor(private httpClient: HttpClient) { }

  getAllPlanetss(){
    return this.httpClient.get<IPlanets[]>(`${API_PATH}/planets`).toPromise();
  }
  getPlanetsById(id: number){
    return this.httpClient.get<IPlanets>(`${API_PATH}/planets/${id}`).toPromise();
  }
}
