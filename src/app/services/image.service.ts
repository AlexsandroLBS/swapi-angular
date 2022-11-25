import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createClient } from 'pexels';
import { BING_API, BING_HOST, BING_KEY } from 'src/environments/environment';
import { IImage } from '../interfaces/IImages';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

constructor(private httpClient: HttpClient){ }

  public getImage(name: string){
    return this.httpClient.get<IImage>(`${BING_API}?q=${name}-star-wars&count=1`,
    {headers:{
      'X-RapidAPI-Key':BING_KEY,
      'X-RapidAPI-Host': BING_HOST
    }}).toPromise()
  }
}
