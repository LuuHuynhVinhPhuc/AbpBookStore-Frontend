import { AuthService } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [HeaderComponent, RouterOutlet, FooterComponent, CommonModule, FormsModule, NgbDropdown],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private authService = inject(AuthService);

  get hasLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }
}
