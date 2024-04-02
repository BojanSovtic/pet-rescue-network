import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SheltersRoutingModule } from "./shelters-routing.module";
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SheltersRoutingModule,
    SharedModule
  ]
})
export class SheltersModule { }
