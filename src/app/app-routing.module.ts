import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
  { path: 'decks', loadChildren: () => import('./modules/decks/decks.module').then(m => m.DecksModule) },
  { path: 'battlefield', loadChildren: () => import('./modules/battlefield/battlefield.module').then(m => m.BattlefieldModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
