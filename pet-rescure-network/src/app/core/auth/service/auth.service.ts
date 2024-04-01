import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { HttpClient } from "@angular/common/http";

import { AuthResponseData } from "../model/auth.model";
import { environment } from '../../../../environments/environment';
import * as fromApp from "../../../store/app.reducer";
import * as AuthActions from '../store/auth.actions'


@Injectable({ providedIn: 'root' })
export class AuthService {
  tokenExpirationTimer: any;

  constructor(private store: Store<fromApp.AppState>, private http: HttpClient) { }

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(AuthActions.logout())
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  login(payload: { email: string, password: string }) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
      {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      }
    )
  }

  signup(payload: { email: string, password: string }) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
      {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      }
    )
  }
}
