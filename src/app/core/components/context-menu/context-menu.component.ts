import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent {
  @Input() x: number = 0;
  @Input() y: number = 0;
  @Input() items: string[] = [];
  @Output() itemClicked: EventEmitter<string> = new EventEmitter<string>();
  visible: boolean = false;

  showMenu(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.visible = true;
  }

  hideMenu() {
    this.visible = false;
  }

  onItemClick(item: string) {
    this.itemClicked.emit(item);
    this.hideMenu();
  }
}
