import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextMenuComponent } from './context-menu/context-menu.component';


@NgModule({
  declarations: [ContextMenuComponent],
  exports: [ContextMenuComponent],
  imports: [
    CommonModule
  ]
})
export class ContextModule { }
