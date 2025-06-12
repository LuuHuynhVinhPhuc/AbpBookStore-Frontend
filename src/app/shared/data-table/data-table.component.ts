import { PageModule } from '@abp/ng.components/page';
import { CoreModule } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { Component, ContentChildren, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TableActionComponent } from './action/table-action.component';
import { ActionCellComponent } from './cell/actionCell.component';
import { ClickCellComponent } from './cell/clickCell.component';
import { AppTextboxCellComponent } from './cell/textboxCell.component';
import { TextCellComponent } from './cell/textCell.component';
import { ChildTableComponent } from './child-table/child-table.component';
import { ColumnComponent } from './column/column.component';
import { TChildColumn, TChildHeader } from './data-table.model';
import { HeaderTableComponent } from './header/header.component';

export enum SelectionType {
  single = 'single',
  multi = 'multi',
}

export type PaginationPosition =
  | 'top'
  | 'bottom'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'both';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    PageModule,
    CoreModule,
    ThemeSharedModule,
    NgbTooltipModule,
    ColumnComponent,
    TableActionComponent,
    HeaderTableComponent,
    TextCellComponent,
    ActionCellComponent,
    ClickCellComponent,
    AppTextboxCellComponent,
    ChildTableComponent,
    NgbPaginationModule,
  ],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent {
  @ContentChildren(HeaderTableComponent) headers: QueryList<HeaderTableComponent>;
  @ContentChildren(ColumnComponent) columns: QueryList<ColumnComponent>;
  @ContentChildren(TableActionComponent) actions: QueryList<TableActionComponent>;

  @Input() records: any[] = [];
  @Input() loading: boolean = true;
  @Input() errorData: string;
  @Input() showCheckbox: boolean = false;
  @Input() showCheckboxIcon: boolean = false;
  @Input() isReadOnly: boolean = false;
  @Input() itemEdit: boolean;
  @Input() itemRemove: boolean;
  @Input() hasClickRow: boolean = false;

  // child table
  @Input() fieldChild: string;
  @Input() childHeaders: TChildHeader[];
  @Input() childColumns: TChildColumn[];

  // click single row or multiple row
  @Input() selectionType: string = SelectionType.single;

  // actions
  @Input() fieldReadOnlyAction: string;
  @Input() disableAction: boolean = false;

  // input for cell
  @Input() disabledInputCell: boolean = false;

  @Input() fixColumn: 'first' | 'last' | null = null;

  // Paging
  @Input() isActivePaging: boolean;
  @Input() totalCount: number;
  @Input() pageSize: number = 5;
  @Input() positionPaging: PaginationPosition = 'bottom-right';

  @Output() editItemHandler = new EventEmitter<any>();
  @Output() removeItemHandler = new EventEmitter<any>();
  @Output() checkboxChange = new EventEmitter<any>();
  @Output() clickCellItemHandler = new EventEmitter<any>();
  @Output() itemSelectChange = new EventEmitter<any>();
  @Output() loadMore = new EventEmitter<any>();
  @Output() clickedRowHandler = new EventEmitter<any>();
  @Output() changeValueCellItemHandler = new EventEmitter<any>();
  @Output() changedPaging = new EventEmitter<number>();

  constructor() {}

  getValue(data: any, path: string) {
    if (!path) return undefined;

    // Split the path into an array of keys
    const keys = path.split('.').map((key) => key.replace('?', '')); // Remove optional chaining symbols

    // Recursive traversal
    return keys.reduce((obj, key) => {
      // Return undefined if current object is null/undefined
      return obj == null ? undefined : obj[key];
    }, data);
  }

  editActionHandler(entry: any, column: any) {
    this.editItemHandler.emit({ entry, column });
  }

  removeActionHandler(entry: any, column: any) {
    this.removeItemHandler.emit({ entry, column });
  }

  onCheckboxChange(event: Event, data) {
    this.checkboxChange.emit({ event, data });
  }

  clickCellActionHandler(entry: any, column: any) {
    this.clickCellItemHandler.emit({ entry, column });
  }

  checkboxSelectChange(entry: any) {
    this.itemSelectChange.emit(entry);
  }

  checkReadOnly(entry: any) {
    if (this.fieldReadOnlyAction) {
      const val = this.fieldReadOnlyAction.split('.').reduce((o, i) => o[i], entry);
      return !val;
    }
    if (this.disableAction) {
      return true;
    }
    return this.isReadOnly ? true : false;
  }

  onClickedRow(data, $event) {
    if (
      this.hasClickRow &&
      $event.target.type !== 'checkbox' &&
      !$event.target.classList.contains('check') &&
      this.selectionType === SelectionType.single
    ) {
      this.records.map((r) => (r.isFocused = false));
      data.isFocused = !data.isFocused;
      this.clickedRowHandler.emit(data);
    }
    // handle click row for multiple row
    if (this.selectionType === SelectionType.multi) {
      data.isFocused = !data.isFocused;
      this.clickedRowHandler.emit(data);
    }
  }

  handleCellValueChanges() {
    this.changeValueCellItemHandler.emit(this.records);
  }

  toggleRow(row: any): void {
    row.expanded = !row.expanded;
  }

  getColumnCount(): number {
    let count = 0;
    if (this.showCheckbox) count++;
    if (this.actions && this.actions.length) count++;
    return count + (this.headers ? this.headers.length : 0);
  }

  shouldShowPagination(position: 'top' | 'bottom'): boolean {
    if (!this.isActivePaging || !this.records || this.records.length === 0) {
      return false;
    }

    const [basePosition] = this.positionPaging.split('-');
    return basePosition === position || this.positionPaging === 'both';
  }

  getPaginationClass(position: 'top' | 'bottom'): string {
    const classes = ['pagination-container'];

    if (this.positionPaging.includes('left')) {
      classes.push('justify-content-start');
    } else if (this.positionPaging.includes('right')) {
      classes.push('justify-content-end');
    } else {
      classes.push('justify-content-center');
    }

    if (position === 'top') {
      classes.push('pagination-top');
    } else {
      classes.push('pagination-bottom');
    }

    return classes.join(' ');
  }

  onChangePage($event: number) {
    this.changedPaging.emit($event);
  }

  getCountColumnExpand(): number {
    let count = 0;
    if (this.showCheckbox) count++;
    if (this.actions && this.actions.length) count++;
    return count;
  }
}
