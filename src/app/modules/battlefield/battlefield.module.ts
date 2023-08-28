import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BattlefieldRoutingModule } from './battlefield-routing.module';
import { BattlefieldComponent } from './pages/battlefield/battlefield.component';
import {DragDropModule} from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [BattlefieldComponent],
  imports: [
    CommonModule, BattlefieldRoutingModule, DragDropModule
  ]
})
export class BattlefieldModule { }
