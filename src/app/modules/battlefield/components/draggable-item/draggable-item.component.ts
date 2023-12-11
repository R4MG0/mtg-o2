import { Component, Input, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-draggable-item',
  template: `
    <div
      class="draggable-item"
      [ngStyle]="{'left.px': positionX, 'top.px': positionY}"
      (mousedown)="onMouseDown($event)"
      (document:mouseup)="onMouseUp($event)"
      (document:mousemove)="onMouseMove($event)">
      {{ content }}
    </div>
  `,
  styles: [
    `
    .draggable-item {
      position: absolute;
      width: 100px;
      height: 100px;
      border: 1px solid #000;
      cursor: move;
      background-color: #f0f0f0;
      text-align: center;
      line-height: 100px;
    }
    `
  ]
})
export class DraggableItemComponent {
  @Input() content: string = '';
  positionX: number = 0;
  positionY: number = 0;
  isDragging: boolean = false;
  startX: number = 0;
  startY: number = 0;
  initialParent: HTMLElement | null = null;

  constructor(private elementRef: ElementRef) {}

  onMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    this.startX = event.clientX - this.positionX;
    this.startY = event.clientY - this.positionY;
    this.initialParent = this.elementRef.nativeElement.parentElement;
    event.preventDefault();
    event.stopPropagation();
  }

  onMouseUp(event: MouseEvent): void {
    this.isDragging = false;
    event.preventDefault();
    event.stopPropagation();
  }

  onMouseMove(event: MouseEvent): void {
    if (this.isDragging) {
      this.positionX = event.clientX - this.startX;
      this.positionY = event.clientY - this.startY;
      this.updatePosition();
      event.preventDefault();
      event.stopPropagation();
    }
  }

  private updatePosition(): void {
    this.elementRef.nativeElement.style.left = this.positionX + 'px';
    this.elementRef.nativeElement.style.top = this.positionY + 'px';
  }
}

