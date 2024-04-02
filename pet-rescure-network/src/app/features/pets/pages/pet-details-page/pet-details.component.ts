import { Component, OnInit } from '@angular/core';
import { Subscription, map } from 'rxjs';

import { Pet } from '../../../../shared/models/pet.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducer';
import * as PetActions from '../../store/pets.actions'
import { Router } from '@angular/router';
import { showSuccessToast } from '../../../../shared/util/snackbar-utils';
import { Actions, ofType } from '@ngrx/effects';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pet-details',
  templateUrl: 'pet-details.component.html'
})
export class PetDetails implements OnInit {
  pet!: Pet | null;

  private petsSub!: Subscription;
  private deleteSuccessToastSub!: Subscription;


  constructor(private store: Store<fromApp.AppState>,
    private router: Router,
    private actions: Actions,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.petsSub = this.store.select('pets')
      .pipe(map(petsState => petsState.selectedPet))
      .subscribe((selectedPet: Pet | null) => {
        this.pet = selectedPet
      });

    this.deleteSuccessToastSub = this.actions.pipe(ofType(PetActions.DELETE_PET_SUCCESS)).subscribe(() => {
      showSuccessToast(this.snackBar, 'Pet deleted successfully')
      this.router.navigate(['/pets'])
    })
  }

  editPet() {
    if (this.pet) this.router.navigate([`/pets/${this.pet.id}`])
  }

  deletePet() {
    if (this.pet) this.store.dispatch(PetActions.deletePet({ pet: this.pet }));
  }

  ngOnDestroy() {
    if (this.petsSub) this.petsSub.unsubscribe()
    if (this.deleteSuccessToastSub) this.deleteSuccessToastSub.unsubscribe()
  }
}
