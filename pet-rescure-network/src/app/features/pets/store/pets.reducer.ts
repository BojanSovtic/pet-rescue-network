
import { createReducer, on } from '@ngrx/store';
import { Pet } from '../../../shared/models/pet.model'
import * as PetsActions from './pets.actions'

export interface State {
  pets: Pet[]
}

const initialState: State = {
  pets: []
}

export const petsReducer = createReducer(
  initialState,

  on(PetsActions.fetchPets, state => state),
  on(PetsActions.setPets, (state, { pets }) => ({
    ...state,
    pets: [...pets]
  })),
  on(PetsActions.addPet, (state, { pet }) => ({
    ...state,
    pets: [...state.pets, pet]
  }))
);
