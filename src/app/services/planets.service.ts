import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATH } from 'src/environments/environment';
import { IPlanets } from '../interfaces/IPlanets';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {

constructor(private httpClient: HttpClient) {}
  name: string = ''
  getAllPlanets(){
    return this.httpClient.get<IPlanets[]>(`${API_PATH}/planets`).toPromise();
  }
  getPlanetById(id: number){
    return this.httpClient.get<IPlanets>(`${API_PATH}/planets/${id}`).toPromise();
  }
  async getPlanetByUrl(url: string){
    return this.httpClient.get<IPlanets>(`${url}`).toPromise();
  }

  getPlanetName (url: string): string{
    this.getPlanetByUrl(url)
    .then((data) => {
      this.name = data.name
    })
    return this.name
  }
}
