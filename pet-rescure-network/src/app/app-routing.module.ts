import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/pets', pathMatch: 'full' },
  { path: 'pets', loadChildren: () => import('./features/pets/pets.module').then(m => m.PetsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
