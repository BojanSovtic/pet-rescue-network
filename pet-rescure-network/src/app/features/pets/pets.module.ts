import { NgModule } from "@angular/core";

import { PetsSearchPage } from "./pages/pets-search-page/pets-search-page.component";
import { PetsRoutingModule } from "./pets-routing.module";

@NgModule({
  declarations: [
    PetsSearchPage
  ],
  imports: [PetsRoutingModule]
})
export class PetsModule { }
