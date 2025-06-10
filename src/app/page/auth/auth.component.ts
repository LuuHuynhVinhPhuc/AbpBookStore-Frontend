import { AuthService, LoginParams } from '@abp/ng.core';
import { ToasterService } from '@abp/ng.theme.shared';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { loginFormGroup } from './form/AuthFormGroup';

@Component({
  selector: 'app-auth',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  mode: 'login' | 'register' = 'login';
  showPassword = false;
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private toasts: ToasterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.mode = params['mode'] === 'register' ? 'register' : 'login';
    });

    this.loginForm = loginFormGroup(this.fb);
  }

  // Login handler
  onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const loginData: LoginParams = {
      username: this.loginForm.value.userName,
      password: this.loginForm.value.password,
      rememberMe: this.loginForm.value.rememberMe,
    };

    console.log(loginData);

    this.authService.login(loginData).subscribe({
      next: (res: any) => {
        console.log('Login response:', res);

        if (res && res.success) {
          this.router.navigate(['/']);
        } else {
          this.toasts.error(
            res?.error?.message || 'An error with user name and password is not correctly',
            'Error'
          );
        }
      },
      error: () => {
        this.toasts.error('Error system', 'Sever issue');
      },
    });
  }

  // Register handler
  onRegister(): void {
    // if (this.registerForm.invalid) {
    //   this.registerForm.markAllAsTouched();
    //   return;
    // }
    // const registerData = this.registerForm.value;
    // this.authService.register(registerData).subscribe({
    //   next: res => {
    //     console.log('Register success', res);
    //   },
    //   error: err => {
    //     console.error('Register failed', err);
    //   },
    // });
  }
}
