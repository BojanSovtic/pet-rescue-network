// loading-spinner.component.ts
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducer'

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  isLoading$: Observable<boolean>;

  constructor(private store: Store<fromApp.AppState>) {
    this.isLoading$ = this.store.select(state => state.loading.isLoading);
  }
}
