import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Voiture } from 'src/app/model/Voiture';

@Injectable({
  providedIn: 'root'
})
export class VoitureService {

  constructor(private http:HttpClient) { }
  saveCarInfo(carData: any): Observable<any> {
    return this.http.post<any>(`http://44.198.44.164:9009/api/voitures`, carData);
  }
  getVoitureById(id: string): Observable<Voiture> {
    return this.http.get<Voiture>(`http://44.198.44.164:9009/api/voitures/${id}`);
  }
  editVoiture(data: any, id: string): Observable<any> {
    return this.http.put(`http://44.198.44.164:9009/api/voitures/${id}`, data);
  }
}
