import { Component } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  standalone: false,
  selector: 'app-root',
  providers: [DatatableComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
