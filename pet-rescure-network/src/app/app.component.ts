import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from './store/app.reducer'
import * as AuthActions from './core/auth/store/auth.actions'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pet-rescure-network';

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(AuthActions.autoLogin())
  }
}
