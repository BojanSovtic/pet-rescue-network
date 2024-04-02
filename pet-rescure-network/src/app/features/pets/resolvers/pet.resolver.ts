import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";

import { Pet } from "../../../shared/models/pet.model";
import { Observable, filter, map, take } from "rxjs";
import { inject } from "@angular/core";
import { Store } from "@ngrx/store";

import * as fromApp from '../../../store/app.reducer'
import * as PetsActions from '../store/pets.actions'

export const petResolver: ResolveFn<Pet | null> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  store: Store<fromApp.AppState> = inject(Store)): Observable<Pet | null> => {

  const petId = route.paramMap.get('id')
  return store.select('pets').pipe(
    map((petsState) => {
      if (petId && (!petsState.selectedPet || petsState.selectedPet.id !== petId)) {
        store.dispatch(PetsActions.fetchPet({ petId }));
      }

      return petsState.selectedPet;
    }),
    filter((selectedPet) => {
      return !!selectedPet
    }),
    take(1)
  );
}
