import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from '../schema/image.model';

const URL = "https://localhost:5001/api/image/"

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  getImage (imageID): Observable<Image>{
    return this.http.get<Image>(URL + imageID);
  }
}
