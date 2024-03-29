import { Component, OnInit } from '@angular/core';
import { Subscription, map } from 'rxjs';

import { Pet } from '../../../../shared/models/pet.model';
import { Store } from '@ngrx/store';
import * as fromApp from './../../../../store/app.reducer';
import * as PetActions from '../../store/pets.actions'

@Component({
  selector: 'app-pet-details',
  templateUrl: 'pet-details.component.html'
})
export class PetDetails implements OnInit {
  pet!: Pet | null;
  private petsSub!: Subscription;


  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.petsSub = this.store.select('pets')
      .pipe(map(petsState => petsState.selectedPet))
      .subscribe((selectedPet: Pet | null) => {
        this.pet = selectedPet
      });
  }

  deletePet() {
    if (this.pet) this.store.dispatch(PetActions.deletePet({ pet: this.pet }));
  }

  ngOnDestroy() {
    this.petsSub.unsubscribe()
  }
}
