import { ShowPasswordDirective } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, ShowPasswordDirective, RouterModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  mode: 'login' | 'register' = 'login';
  showPassword = false;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params['mode'] === 'register') {
        this.mode = 'register';
      } else {
        this.mode = 'login';
      }
    });
  }
}
