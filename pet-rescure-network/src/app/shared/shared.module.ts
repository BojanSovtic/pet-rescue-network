import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AngularMaterialModule } from "./angular-material/angular-material.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [

  ],
  imports: [CommonModule],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ],
  providers: []
})
export class SharedModule { }
