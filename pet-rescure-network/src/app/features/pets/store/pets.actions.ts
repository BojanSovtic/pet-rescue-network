import { createAction, props } from '@ngrx/store'

import { Pet } from '../../../shared/models/pet.model'

export const FETCH_PETS = '[Pets] Fetch Pets'
export const FETCH_PET = '[Pets] Fetch Pet'
export const SET_PETS = '[Pets] Set Pets'
export const SELECT_PET = '[Pets] Select Pet'
export const ADD_PET = '[Pets] Add Pet'
export const ADD_PET_SUCCESS = '[Pets] Add Pet Success'
export const ADD_PET_FAILURE = '[Pets] Add Pet Failure'
export const EDIT_PET = '[Pets] Edit Pet'
export const EDIT_PET_SUCCESS = '[Pets] Edit Pet Success'
export const EDIT_PET_FAILURE = '[Pets] Edit Pet Failure'
export const DELETE_PET = '[Pets] Delete Pet'
export const DELETE_PET_SUCCESS = '[Pets] Delete Pet Success'
export const DELETE_PET_FAILURE = '[Pets] Delete Pet Failure'

export const fetchPets = createAction(FETCH_PETS);
export const fetchPet = createAction(FETCH_PET, props<{ petId: string }>());
export const setPets = createAction(SET_PETS, props<{ pets: Pet[] }>());
export const selectPet = createAction(SELECT_PET, props<{ pet: Pet }>());
export const addPet = createAction(ADD_PET, (props<{ pet: Pet }>()));
export const addPetSuccess = createAction(ADD_PET_SUCCESS, (props<{ pet: Pet }>()));
export const addPetFailure = createAction(ADD_PET_FAILURE, (props<{ error: any }>()));
export const editPet = createAction(EDIT_PET, (props<{ pet: Pet }>()));
export const editPetSuccess = createAction(EDIT_PET_SUCCESS, (props<{ pet: Pet }>()));
export const editPetFailure = createAction(EDIT_PET_FAILURE, (props<{ error: any }>()));
export const deletePet = createAction(DELETE_PET, (props<{ pet: Pet }>()));
export const deletePetSuccess = createAction(DELETE_PET_SUCCESS, (props<{ pet: Pet }>()));
export const deletePetFailure = createAction(DELETE_PET_FAILURE, (props<{ error: any }>()));
