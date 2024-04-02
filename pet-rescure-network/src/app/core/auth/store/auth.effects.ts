import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';


import * as AuthActions from './auth.actions';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { User } from '../../../shared/models/user.model';

const handleAuthentication = (expiresIn: number, email: string, userId: string, token: string) => {
  const expirationDate = new Date(
    new Date().getTime() + expiresIn * 1000
  );
  const user = new User(email, userId, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  const payload = { email: email, userId: userId, token: token, expirationDate: expirationDate, redirect: true }
  return AuthActions.authenticateSuccess({ payload });
};


@Injectable()
export class AuthEffects {
  authSignup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signup),
      switchMap((signupAction) =>
        this.authService.signup({ email: signupAction.email, password: signupAction.password }).pipe(
          tap(resData => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
          }),
          map(resData => {
            return handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken);
          })
        )
      )
    )
  );

  authLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap((authData) =>
        this.authService.login({ email: authData.email, password: authData.password }).pipe(
          tap(resData => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
          }),
          map(resData => {
            return handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken);
          })
        )
      )
    )
  );

  authRedirect$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.authenticateSuccess),
    tap((authSuccessAction) => {
      if (authSuccessAction.payload.redirect) {
        this.router.navigate(['/']);
      }
    })
  ),
    { dispatch: false }
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.autoLogin),
      map(() => {
        const userData: {
          email: string,
          id: string,
          _token: string,
          _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData')!);

        if (!userData) return { type: 'DUMMY' }
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
        if (loadedUser.token) {
          const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
          this.authService.setLogoutTimer(expirationDuration);


          const payload = { email: loadedUser.email, userId: loadedUser.id, token: loadedUser.token, expirationDate: new Date(userData._tokenExpirationDate), redirect: false }
          return AuthActions.authenticateSuccess({ payload });
        }
        return { type: 'DUMMY' };
      })
    )
  );

  authLogout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        this.authService.clearLogoutTimer();
        localStorage.removeItem('userData');
        this.router.navigate(['/pets']);
      })
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService
  ) { }
}
