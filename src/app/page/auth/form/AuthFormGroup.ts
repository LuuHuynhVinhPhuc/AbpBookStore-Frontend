import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export function createAccountFormGroup(fb: FormBuilder): FormGroup {
  return fb.group({
    userName: ['', Validators.required],
    emailAddress: ['', Validators.required],
    password: ['', Validators.required],
    appName: ['', Validators.required],
  });
}

export function loginFormGroup(fb: FormBuilder): FormGroup {
  return fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
    rememberMe: [false],
  });
}
