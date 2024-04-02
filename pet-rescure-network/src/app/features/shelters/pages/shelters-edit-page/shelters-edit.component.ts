import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromApp from './../../../../store/app.reducer';


@Component({
  selector: 'app-shelters-edit-page',
  templateUrl: './shelters-edit.component.html',
  styleUrls: [],
})
export class SheltersEdit implements OnInit, OnDestroy {
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}
