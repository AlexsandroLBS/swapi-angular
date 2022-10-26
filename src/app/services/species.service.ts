import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATH } from 'src/environments/environment';
import { ISpecies } from '../interfaces/ISpecies';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {

constructor(private httpClient: HttpClient) { }

  getAllSpecies(){
    return this.httpClient.get<ISpecies[]>(`${API_PATH}/species`);
  }
  getSpecieById(id: number){
    return this.httpClient.get<ISpecies>(`${API_PATH}/species/${id}`).toPromise();
  }

  getSpecieByUrl(url: string){
    return this.httpClient.get<ISpecies>(`${url}`).toPromise();
  }

  getSpeciesListByUrl(url: string){
    return this.httpClient.get<ISpecies[]>(`${url}`);
  }
}
