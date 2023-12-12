import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BattlefieldRoutingModule } from './battlefield-routing.module';
import { BattlefieldComponent } from './pages/battlefield/battlefield.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { DraggableItemComponent } from './components/draggable-item/draggable-item.component';
import { ContainerComponent } from './components/container/container.component';
import { ButtonModule } from 'primeng/button';
import { ContextMenuModule } from 'primeng/contextmenu';



@NgModule({
  declarations: [BattlefieldComponent, DraggableItemComponent, ContainerComponent],
  imports: [
    CommonModule, BattlefieldRoutingModule, DragDropModule, ButtonModule, ContextMenuModule
  ]
})
export class BattlefieldModule { }
