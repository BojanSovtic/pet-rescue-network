import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { shelterResolver } from "./resolvers/shelter.resolver";
import { SheltersEditComponent } from "./pages/shelters-edit-page/shelters-edit.component";
import { SheltersSearchPageComponent } from "./pages/shelters-search-page/shelters-search-page.component";

const routes: Routes = [
  { path: '', component: SheltersSearchPageComponent },
  { path: ':id', component: SheltersEditComponent, resolve: [shelterResolver] },
  { path: 'new', component: SheltersEditComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SheltersRoutingModule { }
