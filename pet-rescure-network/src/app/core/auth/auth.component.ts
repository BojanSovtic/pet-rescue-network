import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

import { Store } from "@ngrx/store";
import * as fromApp from '../../store/app.reducer'
import * as AuthActions from '../auth/store/auth.actions'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;

  private closeSub!: Subscription;
  private storeSub!: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password

    if (this.isLoginMode) {
      this.store.dispatch(AuthActions.login({ email: email, password: password }))
    } else {
      this.store.dispatch(AuthActions.signup({ email: email, password: password }))
    }

    form.reset()
  }

  ngOnDestroy() {
    if (this.closeSub) this.closeSub.unsubscribe();
    if (this.storeSub) this.storeSub.unsubscribe();
  }
}
