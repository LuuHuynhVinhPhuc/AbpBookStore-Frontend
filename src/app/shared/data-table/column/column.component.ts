import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-column',
  template: '',
  standalone: true,
})
export class ColumnComponent {
  @Input() cssClass: string;
  @Input() columnCssClass: string;
  @Input() key: string = 'id';
  @Input() display: string = 'value';
  @Input() type: string;
  @Input() value: string;
  @Input() activeLink: string;
  @Input() columnType: string = 'text';
  @Input() dateFormat: string = 'dd/MM/yyyy HH:mm a';
  @Input() typeControl: string;

  @Input() defaultValue: any;
  @Input() defaultText: string;
  @Input() datasource: any[];
  @Input() tooltipContent: string;
  @Input() getLink: (arg: any) => string;
  @Input() formatter: (value: any, entry: any) => string;
  @Input() disabled: boolean;
}
