import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SheltersRoutingModule } from "./shelters-routing.module";
import { SharedModule } from "../../shared/shared.module";
import { SheltersEditComponent } from "./pages/shelters-edit-page/shelters-edit.component";
import { SheltersSearchPageComponent } from "./pages/shelters-search-page/shelters-search-page.component";


@NgModule({
  declarations: [
    SheltersEditComponent,
    SheltersSearchPageComponent
  ],
  imports: [
    CommonModule,
    SheltersRoutingModule,
    SharedModule
  ]
})
export class SheltersModule { }
