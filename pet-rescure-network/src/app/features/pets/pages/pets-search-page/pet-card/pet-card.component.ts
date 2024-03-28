import { Component, Input } from '@angular/core';
import { Pet } from '../../../../../shared/models/pet.model';

@Component({
  selector: 'app-pet-card',
  templateUrl: 'pet-card.component.html'
})
export class PetCard {
  @Input() pet!: Pet;
}
