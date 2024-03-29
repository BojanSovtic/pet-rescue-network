import { createReducer, on } from '@ngrx/store';
import * as LoadingActions from './loading.actions';

export interface State {
  isLoading: boolean
}

export const initialState: State = {
  isLoading: false
}

export const loadingReducer = createReducer(
  initialState,
  on(LoadingActions.setLoading, () => ({ isLoading: true })),
  on(LoadingActions.clearLoading, () => ({ isLoading: false }))
);
