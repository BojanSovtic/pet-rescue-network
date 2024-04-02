import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SheltersSearchPage } from "./pages/shelters-search-page/shelters-search-page.component";
import { SheltersEdit } from "./pages/shelters-edit-page/shelters-edit.component";
import { shelterResolver } from "./resolvers/shelter.resolver";

const routes: Routes = [
  { path: '', component: SheltersSearchPage },
  { path: ':id', component: SheltersEdit, resolve: [shelterResolver] },
  { path: 'new', component: SheltersEdit }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SheltersRoutingModule { }
