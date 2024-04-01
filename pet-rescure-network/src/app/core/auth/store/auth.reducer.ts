import { createReducer, on } from '@ngrx/store';

import { User } from '../../../shared/models/user.model';
import * as  AuthActions from './auth.actions';

export interface State {
  user: User | null
};

const initialState: State = {
  user: null
};

export const authReducer = createReducer(
  initialState,

  on(AuthActions.authenticateSuccess, (state, { payload }) => {
    const user = new User(payload.email, payload.userId, payload.token, payload.expirationDate);
    return {
      ...state,
      user: user
    }
  }),
  on(AuthActions.logout, (state) => {
    return {
      ...state,
      user: null
    }
  })
)

