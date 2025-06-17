import { CoreModule } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { CurrencyFormatDirective } from './directives/currency-format.directive';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreModule,
    ThemeSharedModule,
    NgbDropdownModule,
    NgxValidateCoreModule,
    RouterModule,
    FooterComponent,
    HeaderComponent,
    CurrencyFormatDirective,
    FormsModule,
    NgbModule,
  ],
  exports: [
    CommonModule,
    CoreModule,
    ThemeSharedModule,
    NgbDropdownModule,
    NgxValidateCoreModule,
    HeaderComponent,
    FooterComponent,
    RouterModule,
    CurrencyFormatDirective,
  ],
})
export class SharedModule {}
