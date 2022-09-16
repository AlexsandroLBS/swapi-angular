import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATH } from 'src/environments/environment';
import { IVehicles } from '../interfaces/IVehicles';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

constructor(private httpClient: HttpClient) { }

  getAllVehicles(){
    return this.httpClient.get<IVehicles[]>(`${API_PATH}/vehicles`).toPromise();
  }
  getVehicleById(id: number){
    return this.httpClient.get<IVehicles>(`${API_PATH}/vehicles/${id}`).toPromise();
  }
}
