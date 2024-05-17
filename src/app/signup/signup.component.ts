import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  fb = inject(FormBuilder); //injection statt in constructor zu initialisieren
  formSignUp = this.fb.group(
    {
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.minLength(8)],
      password_confirm: ['', Validators.maxLength(8)],
      postal_code: ['', Validators.pattern('^\\d{4}$')]
    }, 
    {
      validators: this.passwordMatchValidator //custom validator
    }
  );
  passwordMatchValidator(formGroup: AbstractControl): ValidationErrors | null  {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('password_confirm')?.value;
    return password === confirmPassword ? null : { 'mismatch': true };
  }
}
