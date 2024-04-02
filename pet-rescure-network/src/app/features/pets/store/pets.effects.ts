import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { of } from "rxjs";

import { convertObjectToArray } from './../../../shared/util/firebase-utils';
import { Pet } from "../../../shared/models/pet.model";
import { PetsService } from "../services/pets.service";
import * as PetActions from './pets.actions'


@Injectable()
export class PetsEffects {
  fetchPets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PetActions.FETCH_PETS),
      switchMap(() =>
        this.petsService.getPets().pipe(
          map((pets: Pet[]) => PetActions.setPets({ pets: convertObjectToArray(pets) }))
        )
      )
    )
  );

  fetchPetById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PetActions.FETCH_PET),
      switchMap((action: { petId: string }) =>
        this.petsService.getPetById(action).pipe(
          map((pet: Pet) => PetActions.selectPet({ pet: { ...pet, id: action.petId } }))
        )
      )
    )
  );

  addPet$ = createEffect(() => this.actions$.pipe(
    ofType(PetActions.ADD_PET),
    switchMap(({ pet }) => {
      return this.petsService.addPet(pet).pipe(
        switchMap(() => of(PetActions.addPetSuccess({ pet }))),
        catchError(error => of(PetActions.addPetFailure({ error })))
      );
    })
  ));

  editPet$ = createEffect(() => this.actions$.pipe(
    ofType(PetActions.EDIT_PET),
    switchMap(({ pet }) => {
      return this.petsService.editPet(pet).pipe(
        switchMap(() => of(PetActions.editPetSuccess({ pet }))),
        catchError(error => of(PetActions.editPetFailure({ error })))
      );
    })
  ));

  deletePet$ = createEffect(() => this.actions$.pipe(
    ofType(PetActions.DELETE_PET),
    switchMap(((action: { pet: Pet }) =>
      this.petsService.deletePet(action).pipe(
        switchMap(() => of(PetActions.deletePetSuccess({ pet: action.pet }))),
        catchError(error => of(PetActions.deletePetFailure({ error })))
      )
    ))
  ));


  constructor(
    private actions$: Actions,
    private petsService: PetsService
  ) { }
}
