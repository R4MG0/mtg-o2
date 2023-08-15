import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecksRoutingModule } from './decks-routing.module';
import { DecksComponent } from './pages/decks/decks.component';
// import {MatCardModule} from '@angular/material/card';
// import { MatDialogModule } from '@angular/material/dialog';
import { DialogContentExampleComponent } from './components/DialogContentExample/DialogContentExample.component';
// import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateDeckComponent } from './pages/create-deck/create-deck.component';


@NgModule({
  declarations: [
    DecksComponent,
    CreateDeckComponent,
    DialogContentExampleComponent
  ],
  imports: [
    CommonModule,
    DecksRoutingModule,
    // MatCardModule,
    // MatDialogModule,
    // MatInputModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DecksModule { }
