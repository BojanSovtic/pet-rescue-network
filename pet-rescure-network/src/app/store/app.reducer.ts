import { ActionReducerMap } from '@ngrx/store'

import * as fromPets from '../features/pets/store/pets.reducer'
import * as fromLoading from '../core/components/loading/store/loading.reducer'

export interface AppState {
  pets: fromPets.State;
  loading: fromLoading.State
}

export const appReducer: ActionReducerMap<AppState> = {
  pets: fromPets.petsReducer,
  loading: fromLoading.loadingReducer
};
