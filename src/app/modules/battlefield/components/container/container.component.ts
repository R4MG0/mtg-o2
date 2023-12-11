import { Component } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent {
 allowDrop(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const data = event.dataTransfer?.getData('text/plain');
    if (data) {
      const target = event.target as HTMLElement;
      const offsetX = event.clientX - target.getBoundingClientRect().left;
      const offsetY = event.clientY - target.getBoundingClientRect().top;
      const newItem = document.createElement('div');
      newItem.textContent = data;
      newItem.className = 'draggable-item';
      newItem.setAttribute('draggable', 'true');
      newItem.style.position = 'absolute';
      newItem.style.left = offsetX + 'px';
      newItem.style.top = offsetY + 'px';
      target.appendChild(newItem);
    }
  }
}
