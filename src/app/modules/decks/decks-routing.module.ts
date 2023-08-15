import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DecksComponent } from './pages/decks/decks.component';
import { CreateDeckComponent } from './pages/create-deck/create-deck.component';

const routes: Routes = [
  { path: '', component: DecksComponent},
  { path: 'create', component: CreateDeckComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecksRoutingModule { }
