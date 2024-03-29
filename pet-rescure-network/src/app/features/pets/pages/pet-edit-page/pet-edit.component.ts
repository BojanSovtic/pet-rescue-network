import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, filter, map } from 'rxjs';

import * as fromApp from '../../../../store/app.reducer';
import { Pet } from '../../../../shared/models/pet.model';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as PetActions from '../../store/pets.actions'
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-edit.component.html',
  styleUrl: './pet-edit.component.scss'
})
export class PetEditComponent implements OnInit, OnDestroy {
  petForm!: FormGroup;
  pet!: Pet | null;
  private petsSub!: Subscription;
  editMode = false;

  constructor(private formBuilder: FormBuilder,
    private store: Store<fromApp.AppState>,
    private actions: Actions,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.setMode()
    this.createForm();
    this.actions.pipe(ofType(PetActions.ADD_PET_SUCCESS)).subscribe((data: any) => this.showSuccessToast())
    if (this.editMode) {
      this.petsSub = this.store.select('pets')
        .pipe(map(petsState => petsState.selectedPet))
        .subscribe((pet: Pet | null) => {
          this.pet = pet;
          this.patchForm()
        });
    }
  }

  private patchForm(): void {
    if (this.pet !== null)
      this.petForm.patchValue({
        name: this.pet.name,
        description: this.pet.description,
        imageURL: this.pet.imageURL
      });
  }

  setMode() {
    const urlSegments = this.route.snapshot.url.map(segment => segment.path);
    this.editMode = !urlSegments.includes('new');
  }

  createForm() {
    this.petForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')]],
      description: [''],
      imageURL: ['']
    });
  }

  onSubmit() {
    if (this.petForm.valid) {
      console.log(this.petForm.value);
      if (this.pet) {
        // EDIT PET
      } else {
        this.store.dispatch(PetActions.addPet({ pet: this.petForm.value }));
      }
    } else {
      this.petForm.markAllAsTouched();
    }
  }

  showSuccessToast() {
    console.log('------- SUCCES!')
    this.snackBar.open('Pet added successfully', 'Close', {
      duration: 3000,
      panelClass: ['success-toast']
    });
  }

  ngOnDestroy() {
    if (this.petsSub) this.petsSub.unsubscribe()
  }
}
