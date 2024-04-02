import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Shelter } from '../../../shared/models/shelter.model';

@Injectable({
  providedIn: 'root'
})
export class SheltersService {
  constructor(private http: HttpClient) { }

  getShelters(): Observable<Shelter[]> {
    return this.http.get<Shelter[]>(`${environment.firebaseBaseUrl}/shelters.json`);
  }

  getShelterById(payload: { shelterId: string }): Observable<Shelter> {
    return this.http.get<Shelter>(`${environment.firebaseBaseUrl}/shelters/${payload.shelterId}.json`);
  }

  addShelter(shelter: Shelter): Observable<Shelter> {
    return this.http.post<Shelter>(`${environment.firebaseBaseUrl}/shelters.json`, shelter);
  }

  editShelter(shelter: Shelter): Observable<Shelter> {
    return this.http.put<Shelter>(`${environment.firebaseBaseUrl}/shelters/${shelter.id}.json`, shelter);
  }

  deleteShelter(payload: { shelter: Shelter }): Observable<null> {
    return this.http.delete<null>(`${environment.firebaseBaseUrl}/shelters/${payload.shelter.id}.json`);
  }
}
