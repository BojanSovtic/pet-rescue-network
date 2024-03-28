import { Component } from '@angular/core';

import { Pet } from '../../../../shared/models/pet.model';

@Component({
  selector: 'app-pets-search-page',
  templateUrl: './pets-search-page.component.html',
  styleUrls: [],
})
export class PetsSearchPage {
  pets: Pet[] = [{
    id: 1,
    name: "Marko",
    description: "Lepotan",
    imageURL: 'https://cdn.pixabay.com/photo/2017/09/25/13/12/puppy-2785074_1280.jpg'
  },
  {
    id: 2,
    name: "Marko 2",
    description: "Lepotan",
    imageURL: 'https://cdn.pixabay.com/photo/2017/09/25/13/12/puppy-2785074_1280.jpg'
  },
  {
    id: 3,
    name: "Marko 3",
    description: "Lepotan",
    imageURL: 'https://cdn.pixabay.com/photo/2017/09/25/13/12/puppy-2785074_1280.jpg'
  },
  {
    id: 4,
    name: "Marko 4",
    description: "Lepotan",
    imageURL: 'https://cdn.pixabay.com/photo/2017/09/25/13/12/puppy-2785074_1280.jpg'
  },
  {
    id: 5,
    name: "Marko 5",
    description: "Lepotan",
    imageURL: 'https://cdn.pixabay.com/photo/2017/09/25/13/12/puppy-2785074_1280.jpg'
  },
  {
    id: 6,
    name: "Marko 6",
    description: "Lepotan",
    imageURL: 'https://cdn.pixabay.com/photo/2017/09/25/13/12/puppy-2785074_1280.jpg'
  },
  {
    id: 7,
    name: "Marko 7",
    description: "Lepotan",
    imageURL: 'https://cdn.pixabay.com/photo/2017/09/25/13/12/puppy-2785074_1280.jpg'
  }]

  constructor() { }

}
