import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Observable, filter, map, take } from "rxjs";
import { inject } from "@angular/core";
import { Store } from "@ngrx/store";

import { Shelter } from "../../../shared/models/shelter.model";
import * as fromApp from '../../../store/app.reducer'
import * as ShelterActions from '../store/shelters.actions'

export const shelterResolver: ResolveFn<Shelter | null> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  store: Store<fromApp.AppState> = inject(Store)): Observable<Shelter | null> => {

  const shelterId = route.paramMap.get('id')
  return store.select('shelters').pipe(
    map((sheltersState) => {
      if (shelterId && (!sheltersState.selectedShelter || sheltersState.selectedShelter.id !== shelterId)) {
        store.dispatch(ShelterActions.fetchShelter({ shelterId }));
      }

      return sheltersState.selectedShelter;
    }),
    filter((selectedShelter) => {
      return !!selectedShelter
    }),
    take(1)
  );
}
