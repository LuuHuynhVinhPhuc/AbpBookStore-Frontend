import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseurl = 'https://localhost:44332/api/account/login';

  private httpClient = inject(HttpClient);
  private router = inject(Router);

  login(username: string, password: string, rememberMe: boolean) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      RequestVerificationToken: '<TOKEN>',
      'X-Requested-With': 'XMLHttpRequest',
    });

    const body = {
      userNameOrEmailAddress: username,
      password: password,
      rememberMe: rememberMe,
    };

    return this.httpClient.post<any>(`${this.baseurl}/login`, body, { headers });
  }

  logout(): void {
    this.httpClient.get('/api/account/logout').subscribe(() => {
      // Clear token or local/session storage
      localStorage.removeItem('access_token');
      sessionStorage.clear();

      // Redirect to login
      this.router.navigate(['/login']);
    });
  }
}
