import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

import { Shelter } from '../../../../shared/models/shelter.model';
import { User } from '../../../../shared/models/user.model';
import { showSuccessToast } from '../../../../shared/util/snackbar-utils';
import * as fromApp from './../../../../store/app.reducer';
import * as SheltersActions from '../../store/shelters.actions';



@Component({
  selector: 'app-shelters-edit-page',
  templateUrl: './shelters-edit.component.html',
  styleUrl: './shelters-edit.component.scss'
})
export class SheltersEditComponent implements OnInit, OnDestroy {
  shelterForm!: FormGroup;
  shelter!: Shelter | null;
  editMode = false;
  user!: User | null;

  private sheltersSub!: Subscription;
  private userSub!: Subscription;
  private addSuccessToastSub!: Subscription;
  private editSuccessToastSub!: Subscription;

  constructor(private formBuilder: FormBuilder,
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private actions: Actions,
    private snackBar: MatSnackBar,
    private location: Location
  ) { }

  ngOnInit() {
    this.setMode()
    this.createForm()

    this.addSuccessToastSub = this.actions.pipe(ofType(SheltersActions.ADD_SHELTER_SUCCESS)).subscribe(() => showSuccessToast(this.snackBar, 'Shelter added successfully'))
    this.editSuccessToastSub = this.actions.pipe(ofType(SheltersActions.EDIT_SHELTER_SUCCESS)).subscribe(() => showSuccessToast(this.snackBar, 'Shelter edited successfully'))

    this.userSub = this.store.select('auth')
      .pipe(map(authState => authState.user))
      .subscribe(user => this.user = user)

    if (this.editMode) {
      this.sheltersSub = this.store.select('shelters')
        .pipe(map(sheltersState => sheltersState.selectedShelter))
        .subscribe((shelter: Shelter | null) => {
          this.shelter = shelter;
          this.patchForm()
        });
    }

    console.log('------ LOADED SHELTER: ', this.shelter)
  }

  private patchForm(): void {
    if (this.shelter !== null)
      this.shelterForm.patchValue({
        name: this.shelter.name,
        description: this.shelter.description,
        contact: this.shelter.contact,
        website: this.shelter.website,
        imageURL: this.shelter.imageURL,
        userId: this.shelter.userId,
      });
  }

  private setMode() {
    const urlSegments = this.route.snapshot.url.map(segment => segment.path);
    this.editMode = !urlSegments.includes('new');
  }

  private createForm() {
    this.shelterForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')]],
      description: [''],
      contact: this.formBuilder.group({
        email: [''],
        phone: [''],
        address: [''],
      }),
      website: [''],
      imageURL: [''],
      userId: ['']
    });
  }

  onSubmit() {
    console.log(" User: ", this.user);
    if (this.shelterForm.valid || !this.user) {
      console.log(this.shelterForm.value);
      if (this.shelter) {
        this.store.dispatch(SheltersActions.editShelter({ shelter: { ...this.shelterForm.value, userId: this.user?.id, id: this.shelter.id }, }));
      } else {
        this.store.dispatch(SheltersActions.addShelter({ shelter: { ...this.shelterForm.value, userId: this.user?.id }, }));
      }
    } else {
      this.shelterForm.markAllAsTouched();
    }
  }

  navigateBack() {
    this.location.back();
  }

  ngOnDestroy() {
    if (this.sheltersSub) this.sheltersSub.unsubscribe()
    if (this.addSuccessToastSub) this.addSuccessToastSub.unsubscribe()
    if (this.editSuccessToastSub) this.editSuccessToastSub.unsubscribe()
    if (this.userSub) this.userSub.unsubscribe()
  }
}
