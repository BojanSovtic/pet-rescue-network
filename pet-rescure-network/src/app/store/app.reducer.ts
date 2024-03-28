import { ActionReducerMap } from '@ngrx/store'

import * as fromPets from '../features/pets/store/pets.reducer'

export interface AppState {
  pets: fromPets.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  pets: fromPets.petsReducer
};
