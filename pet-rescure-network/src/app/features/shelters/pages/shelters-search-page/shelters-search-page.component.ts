import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromApp from './../../../../store/app.reducer';


@Component({
  selector: 'app-shelters-search-page',
  templateUrl: './shelters-search-page.component.html',
  styleUrls: [],
})
export class SheltersSearchPage implements OnInit, OnDestroy {
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}
