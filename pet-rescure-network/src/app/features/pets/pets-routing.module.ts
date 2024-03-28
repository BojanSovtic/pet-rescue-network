import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PetsSearchPage } from "./pages/pets-search-page/pets-search-page.component";

const routes: Routes = [{ path: '', component: PetsSearchPage }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetsRoutingModule { }
