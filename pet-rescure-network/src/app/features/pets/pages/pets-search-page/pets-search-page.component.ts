import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, map } from 'rxjs';

import { Pet } from '../../../../shared/models/pet.model';
import { Store } from '@ngrx/store';
import * as fromApp from './../../../../store/app.reducer';
import * as PetsActions from '../../store/pets.actions'
import { Router } from '@angular/router';

@Component({
  selector: 'app-pets-search-page',
  templateUrl: './pets-search-page.component.html',
  styleUrls: [],
})
export class PetsSearchPage implements OnInit, OnDestroy {
  pets: Pet[] = [];
  private petsSub!: Subscription;

  constructor(private store: Store<fromApp.AppState>, private router: Router) { }

  ngOnInit() {
    this.petsSub = this.store.select('pets')
      .pipe(map(petsState => petsState.pets))
      .subscribe((pets: Pet[]) => {
        this.pets = pets;
      });
    this.store.dispatch(PetsActions.fetchPets())
  }

  ngOnDestroy() {
    this.petsSub.unsubscribe()
  }

  selectPet(petId: string) {
    this.router.navigate([`/pets/detail/${petId}`])
  }
}
