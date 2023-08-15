import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BattlefieldRoutingModule } from './battlefield-routing.module';
import { BattlefieldComponent } from './pages/battlefield/battlefield.component';

@NgModule({
  declarations: [BattlefieldComponent],
  imports: [
    CommonModule, BattlefieldRoutingModule
  ]
})
export class BattlefieldModule { }
