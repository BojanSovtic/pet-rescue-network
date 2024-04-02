import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, map } from 'rxjs';
import { Router } from '@angular/router';

import * as fromApp from '../../../store/app.reducer';
import * as AuthActions from '../../auth/store/auth.actions'
import { User } from '../../../shared/models/user.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  user!: User | null;

  private userSub!: Subscription;

  constructor(private store: Store<fromApp.AppState>, private router: Router) { }

  ngOnInit() {
    this.userSub = this.store.select('auth')
      .pipe(map(authState => authState.user))
      .subscribe(user => {
        this.isAuthenticated = !!user
        this.user = user
      })
  }

  addPet() {
    this.router.navigate(['/pets/new']);
  }

  addShelter() {
    this.router.navigate(['/shelters/new']);
  }

  login() {
    this.router.navigate(['/auth']);
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout());
  }

  navigateHome() {
    this.router.navigate(['/'])
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }
}
