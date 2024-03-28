import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { PetsEffects } from './features/pets/store/pets.effects'
import * as fromApp from './store/app.reducer';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([PetsEffects]),
    SharedModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
