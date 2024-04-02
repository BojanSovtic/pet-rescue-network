import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { of } from "rxjs";

import { convertObjectToArray } from './../../../shared/util/firebase-utils';
import { SheltersService } from "../services/shelter.service";
import { Shelter } from "../../../shared/models/shelter.model";
import * as SheltersActions from './shelters.actions'


@Injectable()
export class SheltersEffects {
  fetchShelters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SheltersActions.FETCH_SHELTERS),
      switchMap(() =>
        this.sheltersService.getShelters().pipe(
          map((shelters: Shelter[]) => SheltersActions.setShelters({ shelters: convertObjectToArray(shelters) }))
        )
      )
    )
  );

  fetchShelterById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SheltersActions.FETCH_SHELTER),
      switchMap((action: { shelterId: string }) =>
        this.sheltersService.getShelterById(action).pipe(
          map((shelter: Shelter) => SheltersActions.selectShelter({ shelter: { ...shelter, id: action.shelterId } }))
        )
      )
    )
  );

  addShelter$ = createEffect(() => this.actions$.pipe(
    ofType(SheltersActions.ADD_SHELTER),
    switchMap(({ shelter }) => {
      return this.sheltersService.addShelter(shelter).pipe(
        switchMap(() => of(SheltersActions.addShelterSuccess({ shelter }))),
        catchError(error => of(SheltersActions.addShelterFailure({ error })))
      );
    })
  ));

  editShelter$ = createEffect(() => this.actions$.pipe(
    ofType(SheltersActions.EDIT_SHELTER),
    switchMap(({ shelter }) => {
      return this.sheltersService.editShelter(shelter).pipe(
        switchMap(() => of(SheltersActions.editShelterSuccess({ shelter }))),
        catchError(error => of(SheltersActions.editShelterFailure({ error })))
      );
    })
  ));

  deleteShelter$ = createEffect(() => this.actions$.pipe(
    ofType(SheltersActions.DELETE_SHELTER),
    switchMap(((action: { shelter: Shelter }) =>
      this.sheltersService.deleteShelter(action).pipe(
        switchMap(() => of(SheltersActions.deleteShelterSuccess({ shelter: action.shelter }))),
        catchError(error => of(SheltersActions.deleteShelterFailure({ error })))
      )
    ))
  ));


  constructor(
    private actions$: Actions,
    private sheltersService: SheltersService
  ) { }
}
