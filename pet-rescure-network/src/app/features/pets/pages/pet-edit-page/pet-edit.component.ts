import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, map } from 'rxjs';

import * as fromApp from '../../../../store/app.reducer';
import { Pet } from '../../../../shared/models/pet.model';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.setMode()
    this.createForm();
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
        // CREATE PET
      }
    } else {
      this.petForm.markAllAsTouched();
    }
  }

  ngOnDestroy() {
    if (this.petsSub) this.petsSub.unsubscribe()
  }
}
