import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { convertObjectToArray } from './../../../shared/util/firebase-utils';
import { Pet } from "../../../shared/models/pet.model";
import { environment } from '../../../../environments/environment';
import * as PetActions from './pets.actions'
import { of } from "rxjs";


@Injectable()
export class PetsEffects {
  fetchPets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PetActions.FETCH_PETS),
      switchMap(() =>
        this.http.get<Pet[]>(`${environment.firebaseBaseUrl}/pets.json`).pipe(
          map((pets: Pet[]) => PetActions.setPets({ pets: convertObjectToArray(pets) }))
        )
      )
    )
  );

  fetchPetById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PetActions.FETCH_PET),
      switchMap((action: { petId: string }) =>
        this.http.get<Pet>(`${environment.firebaseBaseUrl}/pets/${action.petId}.json`).pipe(
          map((pet: Pet) => PetActions.selectPet({ pet: { ...pet, id: action.petId } }))
        )
      )
    )
  );

  deletePet$ = createEffect(() => this.actions$.pipe(
    ofType(PetActions.DELETE_PET),
    switchMap(((action: { pet: Pet }) =>
      this.http.delete<Pet>(`${environment.firebaseBaseUrl}/pets/${action.pet.id}.json`).pipe(
        switchMap(() => of(PetActions.deletePetSuccess({ pet: action.pet }))),
        catchError(error => of(PetActions.deletePetFailure({ error })))
      )
    ))
  ));


  constructor(
    private actions$: Actions,
    private http: HttpClient,
  ) { }
}
