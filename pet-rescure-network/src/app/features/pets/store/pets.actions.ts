import { createAction, props } from '@ngrx/store'

import { Pet } from '../../../shared/models/pet.model'

export const FETCH_PETS = '[Pets] Fetch Pets'
export const SET_PETS = '[Pets] Set Pets'
export const ADD_PET = '[Pets] Add Pet'

export const fetchPets = createAction(FETCH_PETS);
export const setPets = createAction(SET_PETS, props<{ pets: Pet[] }>());
export const addPet = createAction(ADD_PET, (props<{ pet: Pet }>()));
