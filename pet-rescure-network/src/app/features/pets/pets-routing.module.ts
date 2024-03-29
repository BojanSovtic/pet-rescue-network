import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PetsSearchPage } from "./pages/pets-search-page/pets-search-page.component";
import { PetDetails } from "./pages/pet-details-page/pet-details.component";
import { petResolver } from "./resolvers/pet.resolver";
import { PetEditComponent } from "./pages/pet-edit-page/pet-edit.component";

const routes: Routes = [
  { path: '', component: PetsSearchPage },
  { path: ':id', component: PetEditComponent, resolve: [petResolver] },
  { path: 'new', component: PetEditComponent },
  { path: 'detail/:id', component: PetDetails, resolve: [petResolver] },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetsRoutingModule { }
