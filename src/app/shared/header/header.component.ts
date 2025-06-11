import { AuthService } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, NgbDropdownModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  get hasLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }

  ngOnInit() {
    // Kiểm tra URL để xem có phải là callback từ login không
    const urlParams = new URLSearchParams(window.location.search);
    const returnUrl = urlParams.get('returnUrl');

    if (returnUrl && this.hasLoggedIn) {
      this.router.navigateByUrl(returnUrl);
    }
  }

  get currentUser(): any {
    return {
      name: 'User Name',
      email: 'user@example.com',
      avatar: 'assets/images/default-avatar.png',
    };
  }

  login() {
    if (!this.authService.isAuthenticated) {
      const returnUrl = encodeURIComponent(window.location.origin + '/dashboard'); // hoặc '/' hoặc route Angular nào bạn muốn
      window.location.href = `https://localhost:44332/Account/Login?returnUrl=${returnUrl}`;
    }
  }

  authentication() {
    this.authService.navigateToLogin();
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  navigateToMessages() {
    this.router.navigate(['/messages']);
  }

  navigateToOrders() {
    this.router.navigate(['/orders']);
  }

  navigateToSettings() {
    this.router.navigate(['/settings']);
  }
}
