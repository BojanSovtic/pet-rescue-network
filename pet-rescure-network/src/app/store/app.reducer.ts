import { ActionReducerMap } from '@ngrx/store'

import * as fromPets from '../features/pets/store/pets.reducer'
import * as fromLoading from '../core/components/loading/store/loading.reducer'
import * as fromAuth from '../core/auth/store/auth.reducer'

export interface AppState {
  pets: fromPets.State;
  loading: fromLoading.State,
  auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  pets: fromPets.petsReducer,
  loading: fromLoading.loadingReducer,
  auth: fromAuth.authReducer,
};
