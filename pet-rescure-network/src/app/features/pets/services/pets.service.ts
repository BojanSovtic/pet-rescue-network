import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Pet } from '../../../shared/models/pet.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  constructor(private http: HttpClient) { }

  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${environment.firebaseBaseUrl}/pets.json`);
  }

  getPetById(payload: { petId: string }): Observable<Pet> {
    return this.http.get<Pet>(`${environment.firebaseBaseUrl}/pets/${payload.petId}.json`);
  }

  addPet(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(`${environment.firebaseBaseUrl}/pets.json`, pet);
  }

  deletePet(payload: { pet: Pet }): Observable<null> {
    return this.http.delete<null>(`${environment.firebaseBaseUrl}/pets/${payload.pet.id}.json`);
  }
}
