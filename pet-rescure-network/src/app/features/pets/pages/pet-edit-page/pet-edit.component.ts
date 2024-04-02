import { showSuccessToast } from './../../../../shared/util/snackbar-utils';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, map } from 'rxjs';

import * as fromApp from '../../../../store/app.reducer';
import { Pet } from '../../../../shared/models/pet.model';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as PetActions from '../../store/pets.actions'
import { Actions, ofType } from '@ngrx/effects';
import { User } from '../../../../shared/models/user.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-edit.component.html',
  styleUrl: './pet-edit.component.scss'
})
export class PetEditComponent implements OnInit, OnDestroy {
  petForm!: FormGroup;
  pet!: Pet | null;
  editMode = false;
  user!: User | null;

  private petsSub!: Subscription;
  private userSub!: Subscription;
  private addSuccessToastSub!: Subscription;
  private editSuccessToastSub!: Subscription;

  constructor(private formBuilder: FormBuilder,
    private store: Store<fromApp.AppState>,
    private actions: Actions,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.setMode()
    this.createForm();
    this.addSuccessToastSub = this.actions.pipe(ofType(PetActions.ADD_PET_SUCCESS)).subscribe(() => showSuccessToast(this.snackBar, 'Pet added successfully'))
    this.editSuccessToastSub = this.actions.pipe(ofType(PetActions.EDIT_PET_SUCCESS)).subscribe(() => showSuccessToast(this.snackBar, 'Pet edited successfully'))

    this.userSub = this.store.select('auth')
      .pipe(map(authState => authState.user))
      .subscribe(user => this.user = user)

    if (this.editMode) {
      this.petsSub = this.store.select('pets')
        .pipe(map(petsState => petsState.selectedPet))
        .subscribe((pet: Pet | null) => {
          this.pet = pet;
          this.patchForm()
        });
    }

    console.log('------ LOADED PET: ', this.pet)
  }

  private patchForm(): void {
    if (this.pet !== null)
      this.petForm.patchValue({
        name: this.pet.name,
        description: this.pet.description,
        species: this.pet.species,
        breed: this.pet.breed,
        age: this.pet.age,
        size: this.pet.size,
        gender: this.pet.gender,
        imageURLs: this.pet.imageURLs,
        contact: this.pet.contact,
        userId: this.pet.userId,
        shelterId: this.pet.shelterId,
        shelterName: this.pet.shelterName,
        status: this.pet.status
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
      species: [''],
      breed: [''],
      age: [''],
      size: [''],
      imageURLs: this.formBuilder.array([]),
      contact: this.formBuilder.group({
        email: [''],
        phone: [''],
        address: [''],
      }),
      userId: [''],
      shelterId: [''],
      shelterName: [''],
      status: ['']
    });
  }

  get imageURLs() {
    return (<FormArray>this.petForm.get('imageURLs'));
  }

  addImageURL() {
    this.imageURLs.push(this.formBuilder.control(''));
  }

  removeImageURL(index: number) {
    this.imageURLs.removeAt(index);
  }

  onSubmit() {
    console.log(" User: ", this.user);
    if (this.petForm.valid || !this.user) {
      console.log(this.petForm.value);
      if (this.pet) {
        this.store.dispatch(PetActions.editPet({ pet: { ...this.petForm.value, userId: this.user?.id, id: this.pet.id }, }));
      } else {
        this.store.dispatch(PetActions.addPet({ pet: { ...this.petForm.value, userId: this.user?.id }, }));
      }
    } else {
      this.petForm.markAllAsTouched();
    }
  }

  navigateBack() {
    this.location.back();
  }

  ngOnDestroy() {
    if (this.petsSub) this.petsSub.unsubscribe()
    if (this.addSuccessToastSub) this.addSuccessToastSub.unsubscribe()
    if (this.editSuccessToastSub) this.editSuccessToastSub.unsubscribe()
    if (this.userSub) this.userSub.unsubscribe()
  }
}
