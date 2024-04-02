
import { createReducer, on } from '@ngrx/store';
import { Pet } from '../../../shared/models/pet.model'
import * as PetsActions from './pets.actions'

export interface State {
  pets: Pet[],
  selectedPet: Pet | null
}

const initialState: State = {
  pets: [],
  selectedPet: null
}

export const petsReducer = createReducer(
  initialState,

  on(PetsActions.setPets, (state, { pets }) => ({
    ...state,
    pets: [...pets]
  })),
  on(PetsActions.selectPet, (state, { pet }) => ({
    ...state,
    selectedPet: { ...pet }
  })),
  on(PetsActions.addPetSuccess, (state, { pet }) => ({
    ...state,
    pets: [...state.pets, pet]
  })),
  on(PetsActions.editPetSuccess, (state, { pet }) => {
    let tempForEdit = state.pets.find((tempPet: Pet) => tempPet.id === pet.id)
    tempForEdit = { ...pet }
    return {
      ...state,
      pets: [...state.pets, tempForEdit]
    }
  }),
  on(PetsActions.deletePetSuccess, (state, { pet }) => ({
    ...state,
    pets: state.pets.filter((tempPet) => tempPet.id !== pet.id)
  }))
);
