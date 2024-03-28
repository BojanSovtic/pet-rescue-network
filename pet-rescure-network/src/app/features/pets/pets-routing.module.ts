import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PetsSearchPage } from "./pages/pets-search-page/pets-search-page.component";
import { PetDetails } from "./pages/pet-details/pet-details.component";
import { petResolver } from "./resolvers/pet.resolver";

const routes: Routes = [
  { path: '', component: PetsSearchPage },
  { path: ':id', component: PetDetails, resolve: [petResolver] },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetsRoutingModule { }
