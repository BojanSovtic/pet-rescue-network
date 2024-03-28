import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pet } from '../../../../../shared/models/pet.model';

@Component({
  selector: 'app-pet-card',
  templateUrl: 'pet-card.component.html'
})
export class PetCard {
  @Input() pet!: Pet;
  @Output() selectPet = new EventEmitter<string>();

  setSelectedPet() {
    this.selectPet.emit(this.pet.id)
  }
}
