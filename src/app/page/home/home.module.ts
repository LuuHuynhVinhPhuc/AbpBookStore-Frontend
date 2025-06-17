import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [],
  imports: [SharedModule, HomeRoutingModule, RouterModule, HomeComponent],
})
export class HomeModule {}
