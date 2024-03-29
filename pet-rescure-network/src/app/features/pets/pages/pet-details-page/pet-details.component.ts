import { Component, OnInit } from '@angular/core';
import { Subscription, map } from 'rxjs';

import { Pet } from '../../../../shared/models/pet.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducer';
import * as PetActions from '../../store/pets.actions'
import { Router } from '@angular/router';

@Component({
  selector: 'app-pet-details',
  templateUrl: 'pet-details.component.html'
})
export class PetDetails implements OnInit {
  pet!: Pet | null;
  private petsSub!: Subscription;


  constructor(private store: Store<fromApp.AppState>, private router: Router) { }

  ngOnInit() {
    this.petsSub = this.store.select('pets')
      .pipe(map(petsState => petsState.selectedPet))
      .subscribe((selectedPet: Pet | null) => {
        this.pet = selectedPet
      });
  }

  editPet() {
    if (this.pet) this.router.navigate([`/pets/${this.pet.id}`])
  }

  deletePet() {
    if (this.pet) this.store.dispatch(PetActions.deletePet({ pet: this.pet }));
  }

  ngOnDestroy() {
    this.petsSub.unsubscribe()
  }
}
