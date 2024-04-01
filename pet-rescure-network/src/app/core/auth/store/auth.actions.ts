import { createAction, props } from "@ngrx/store";

export const LOGIN = '[Auth] Login'
export const SIGNUP = '[Auth] Signup'
export const AUTHENTICATE_SUCCESS = '[Auth] Authenticate Success';
export const AUTHENTICATE_FAIL = '[Auth] Authenticate Fail'
export const LOGOUT = '[Auth] Logout';
export const AUTO_LOGIN = '[Auth] Auto Login'

export interface AuthSuccessPayload { email: string, userId: string, token: string, expirationDate: Date, redirect: boolean }

export const login = createAction(LOGIN, props<{ email: string, password: string }>());
export const signup = createAction(SIGNUP, props<{ email: string, password: string }>());
export const authenticateSuccess = createAction(AUTHENTICATE_SUCCESS, props<{ payload: AuthSuccessPayload }>());
export const authenticateFail = createAction(AUTHENTICATE_FAIL, props<{ error: any }>());
export const logout = createAction(LOGOUT);
export const autoLogin = createAction(AUTO_LOGIN);
