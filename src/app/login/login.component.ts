import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  fb = inject(FormBuilder); //injection statt in constructor zu initialisieren
  formLogIn = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    }, 
    {
      validators: this.checkLogin //custom validator
    }
  );

  checkLogin(formGroup: AbstractControl): ValidationErrors | null {
    const login = formGroup.get('email')?.value;
    const password = formGroup.get('password')?.value;

    const result = (login === 'test@test.at') && (password === '12345678');
    
    if (result === true) {
      console.log('Login successful');
    } else {
      console.log('Login failed');
    }
    return result === true? null : {'invalid': true };
  }
}