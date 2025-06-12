import { Component, EventEmitter, Output, Input } from '@angular/core';
import { TextCellComponent } from './textCell.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-click-cell',
  standalone: true,
  template: `<a
      *ngIf="isActive"
      (click)="clickAction.emit(); $event.stopPropagation()"
      class="link-cell {{ cssClass }}"
    >
      {{ formatter(value, entry) }}
    </a>
    <a *ngIf="!isActive" class="no-link-cell {{ cssClass }}">{{ formatter(value, entry) }}</a>`,
  styleUrls: ['dataCell.component.scss'],
  imports: [CommonModule],
})
export class ClickCellComponent extends TextCellComponent {
  @Output() clickAction = new EventEmitter<any>();
  @Input() isActive: boolean;
  @Input() isLockIcon: boolean = false;
}
