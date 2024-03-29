// loading.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { finalize } from 'rxjs/operators';

import * as LoadingActions from './store/loading.actions';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private store: Store<boolean>) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.store.dispatch(LoadingActions.setLoading());
    return next.handle(request).pipe(
      finalize(() => {
        this.store.dispatch(LoadingActions.clearLoading());
      })
    );
  }
}
