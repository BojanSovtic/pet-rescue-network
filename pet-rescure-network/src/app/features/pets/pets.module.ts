import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PetsSearchPage } from "./pages/pets-search-page/pets-search-page.component";
import { PetsRoutingModule } from "./pets-routing.module";
import { SharedModule } from "../../shared/shared.module";
import { PetCard } from "./pages/pets-search-page/pet-card/pet-card.component";
import { PetDetails } from "./pages/pet-details/pet-details.component";

@NgModule({
  declarations: [
    PetsSearchPage,
    PetCard,
    PetDetails
  ],
  imports: [
    CommonModule,
    PetsRoutingModule,
    SharedModule
  ]
})
export class PetsModule { }
