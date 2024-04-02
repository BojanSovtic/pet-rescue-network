
import { createReducer, on } from '@ngrx/store';

import * as ShelterActions from './shelters.actions'
import { Shelter } from '../../../shared/models/shelter.model';

export interface State {
  shelters: Shelter[],
  selectedShelter: Shelter | null
}

const initialState: State = {
  shelters: [],
  selectedShelter: null
}

export const sheltersReducer = createReducer(
  initialState,

  on(ShelterActions.setShelters, (state, { shelters }) => ({
    ...state,
    shelters: [...shelters]
  })),
  on(ShelterActions.selectShelter, (state, { shelter }) => ({
    ...state,
    selectedShelter: { ...shelter }
  })),
  on(ShelterActions.addShelterSuccess, (state, { shelter }) => ({
    ...state,
    shelters: [...state.shelters, shelter]
  })),
  on(ShelterActions.editShelterSuccess, (state, { shelter }) => {
    let tempForEdit = state.shelters.find((tempShelter: Shelter) => tempShelter.id === shelter.id)
    tempForEdit = { ...shelter }
    return {
      ...state,
      shelters: [...state.shelters, tempForEdit]
    }
  }),
  on(ShelterActions.deleteShelterSuccess, (state, { shelter }) => ({
    ...state,
    shelters: state.shelters.filter((tempShelter: Shelter) => tempShelter.id !== shelter.id)
  }))
);
