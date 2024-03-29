import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { HeaderComponent } from "./components/header/header.component";
import { SharedModule } from "../shared/shared.module";
import { LoadingInterceptor } from "./components/loading/loading.interceptor";
import { LoadingComponent } from "./components/loading/loading.component";
import { ErrorInterceptor } from "./services/error-handler.interceptor";

@NgModule({
  declarations: [
    HeaderComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    HeaderComponent,
    LoadingComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ]
})
export class CoreModule { }
