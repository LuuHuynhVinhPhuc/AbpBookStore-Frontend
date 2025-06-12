import { CoreModule } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-text-cell',
  templateUrl: 'textCell.component.html',
  styleUrls: ['./dataCell.component.scss'],
  standalone: true,
  imports: [NgbTooltipModule, CoreModule, ThemeSharedModule],
})
export class TextCellComponent implements OnInit {
  @Input() cssClass: string;
  @Input() value: any;
  @Input() entry: any;
  @Input() columnType: string = 'text';
  @Input() dateFormat: string = 'dd/MM/yyyy HH:mm a';
  @Input() formatter: (text: any, entry: any) => string;
  public isShowTooltip: boolean = false;
  public isCollapse: boolean = true;

  constructor(protected elRef: ElementRef, protected render: Renderer2) {}

  ngOnInit() {
    if (!this.formatter) {
      this.formatter = this.plainTextFormatter;
    }
  }

  plainTextFormatter(text, entry) {
    return text || '';
  }

  getTooltipContent(text, entry) {
    if (entry && entry.error) {
      return entry.error;
    }
    return '';
  }

  findElement(collection: HTMLCollection, code) {
    for (let i = 0; i < collection.length; i++) {
      if (collection.item(i).classList[1] === code) {
        return collection.item(i);
      }
    }
  }

  formatKey(key, action) {
    return action === 6
      ? key.replace(/([A-Z])/g, ' $1').trim()
      : key.replace(/([A-Z][a-z])/g, ' $1').trim();
  }
}
