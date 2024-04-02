import { createAction, props } from '@ngrx/store'

import { Shelter } from '../../../shared/models/shelter.model'


export const FETCH_SHELTERS = '[Shelters] Fetch Shelters'
export const FETCH_SHELTER = '[Shelters] Fetch Shelter'
export const SET_SHELTERS = '[Shelters] Set Shelters'
export const SELECT_SHELTER = '[Shelters] Select Shelter'
export const ADD_SHELTER = '[Shelters] Add Shelter'
export const ADD_SHELTER_SUCCESS = '[Shelters] Add Shelter Success'
export const ADD_SHELTER_FAILURE = '[Shelters] Add Shelter Failure'
export const EDIT_SHELTER = '[Shelters] Edit Shelter'
export const EDIT_SHELTER_SUCCESS = '[Shelters] Edit Shelter Success'
export const EDIT_SHELTER_FAILURE = '[Shelters] Edit Shelter Failure'
export const DELETE_SHELTER = '[Shelters] Delete Shelter'
export const DELETE_SHELTER_SUCCESS = '[Shelters] Delete Shelter Success'
export const DELETE_SHELTER_FAILURE = '[Shelters] Delete Shelter Failure'

export const fetchShelters = createAction(FETCH_SHELTER);
export const fetchShelter = createAction(FETCH_SHELTER, props<{ shelterId: string }>());
export const setShelters = createAction(SET_SHELTERS, props<{ shelters: Shelter[] }>());
export const selectShelter = createAction(SELECT_SHELTER, props<{ shelter: Shelter }>());
export const addShelter = createAction(ADD_SHELTER, (props<{ shelter: Shelter }>()));
export const addShelterSuccess = createAction(ADD_SHELTER_SUCCESS, (props<{ shelter: Shelter }>()));
export const addShelterFailure = createAction(ADD_SHELTER_FAILURE, (props<{ error: any }>()));
export const editShelter = createAction(EDIT_SHELTER, (props<{ Shelter: Shelter }>()));
export const editShelterSuccess = createAction(EDIT_SHELTER_SUCCESS, (props<{ shelter: Shelter }>()));
export const editShelterFailure = createAction(EDIT_SHELTER_FAILURE, (props<{ error: any }>()));
export const deleteShelter = createAction(DELETE_SHELTER, (props<{ Shelter: Shelter }>()));
export const deleteShelterSuccess = createAction(DELETE_SHELTER_SUCCESS, (props<{ shelter: Shelter }>()));
export const deleteShelterFailure = createAction(DELETE_SHELTER_FAILURE, (props<{ error: any }>()));
