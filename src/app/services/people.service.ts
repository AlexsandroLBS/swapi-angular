import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATH } from 'src/environments/environment';
import { IPeople } from '../interfaces/IPeople';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

constructor(private httpClient: HttpClient) { }

  getAllPeoples(){
    return this.httpClient.get<IPeople[]>(`${API_PATH}/people`);
  }
  getPeopleById(id: number){
    return this.httpClient.get<IPeople>(`${API_PATH}/people/${id}`).toPromise();
  }
  getPeopleByLink(url: string){
    return this.httpClient.get<IPeople>(`${url}`).toPromise();
  }
}
