import { PageModule } from '@abp/ng.components/page';
import { CoreModule } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { Component, Input } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TChildColumn, TChildHeader } from '../data-table.model';

export enum SelectionType {
  single = 'single',
  multi = 'multi',
}

@Component({
  selector: 'app-child-table',
  standalone: true,
  imports: [PageModule, CoreModule, ThemeSharedModule, NgbTooltipModule],
  templateUrl: './child-table.component.html',
  styleUrls: ['./child-table.component.scss'],
})
export class ChildTableComponent {
  @Input() headers: TChildHeader[];
  @Input() columns: TChildColumn[];
  @Input() records: any[];

  isExpanded: boolean = true;

  constructor() {}

  toggleTable(): void {
    this.isExpanded = !this.isExpanded;
  }
}
